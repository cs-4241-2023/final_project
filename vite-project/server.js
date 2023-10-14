import express from 'express';
import ViteExpress from 'vite-express';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient(uri);

let diveCollection = null;
let diveListCollection = null;
let totalScoreCollection = null;
let usersCollection = null;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['TJNLjbbduQyUY3Us', 'dCzSZjbeoLvMXyyn', 'baGKcyH7Tyd6NHeT', 'RveCqOjVV41rOw3n', 'VVm0AS15fw2cBisW']
}));
app.use(express.json());

async function run() {
  await client.connect();
  let db = client.db("webware-final-project")
  diveCollection = db.collection("Dive");
  diveListCollection = db.collection("DiveList");
  totalScoreCollection = db.collection("TotalScore");
  usersCollection = db.collection("Users");
}
run();

app.use((request, response, next) => {
  if (!(diveCollection === null || /*diveListCollection === null ||*/ totalScoreCollection === null || usersCollection === null)) {
    next();
  } else {
    response.status(503).send();
  }
});

app.get('/getDives', async (request, response) => {
  const allDives = await diveCollection.find({username: request.session.username}).toArray();
  response.json(allDives);
})

app.get('/getRequirements', async (request, response) => {
  let rule1Pass = false;
  let rule2Pass = false;
  let rule3Pass = false;
  // Check rule 1
  const scores = await totalScoreCollection.find({username: request.session.username}).toArray();
  let scoreCount = 0;
  for (let score in scores) {
    if (scoreCount == 2) {
      rule1Pass = true;
      break;
    }
    if (score.totalScore >= 180) {
      scoreCount++;
    }
  }

  // Check rule 2
  const dives = await diveCollection.find({username: request.session.username}).toArray();
  const qualifiedDives = [];
  if (dives.length >= 11) {
    const potentialQuals = {};
    const qualifiedNames = {};
    for (let dive in dives) {
      let scoreCount = 0;
      for (let score in dive.scores) {
        if (scoreCount == 3) {
          if (!(dive.english_name in qualifiedNames)) {
            if (!(dive.english_name in potentialQuals)) {
              potentialQuals[dive.english_name] = dive;
            } else {
              qualifiedDives.push(potentialQuals[dive.english_name]);
              await diveCollection.updateOne(
                {_id: new ObjectId(potentialQuals[dive.english_name]._id)},
                {$set: {qualified: true}}
              );
              delete potentialQuals[dive.english_name];
              qualifiedDives.push(dive);
              await diveCollection.updateOne(
                {_id: new ObjectId(dive._id)},
                {$set: {qualified: true}}
              );
              qualifiedNames[dive.english_name] = dive.english_name;
            }
          }
          break;
        }
        if (score >= 5) {
          scoreCount++;
        }
      }
    }
    if (qualifiedDives.length / 2 >= 11) {
      rule2Pass = true;
    }
  }

  // Check rule 3
  const codeCount = [0, 0, 0, 0, 0];
  let requirementCount = 0;
  let extraCount = 0;
  for (let dive in qualifiedDives) {
    codeCount[parseInt(dive.code[0]) - 1]++;
  }
  for (let code in codeCount) {
    if (code >= 4) {
      requirementCount++;
    }
    if (code >= 6) {
      extraCount++;
    }
  }
  if (requirementCount == 5 && extraCount >= 1) {
    rule3Pass = true;
  }

  response.json([{name: "Received total score >= 180 twice", met: rule1Pass},
                 {name: "Qualified >= 11 individual dives", met: rule2Pass},
                 {name: "Qualified a valid list of dives", met: rule3Pass}]);
});

app.get('/getScores', async (request, response) => {
  const scores = await totalScoreCollection.find({username: request.session.username}).toArray();
  response.json(scores);
});

app.get('/getUserInfo', async (request, response) => {
  const user = await usersCollection.find({username: request.session.username}).toArray();
  const scores = await totalScoreCollection.find({username: request.session.username}).toArray();
  let maxScore = Number.MIN_VALUE;
  scores.forEach(score => {
    maxScore = Math.max(maxScore, score.total_score);
  });
  response.json({username: user[0].username, 
    yog: user[0].yog, 
    recruiting: user[0].recruiting, 
    bio: user[0].bio,
    level: user[0].level, 
    team: user[0].team, 
    highest_total_score: maxScore});
});

app.post('/login', async (request, response) => {
  let user = await usersCollection.find({username: request.body.username}).toArray();
  if (user.length === 0) {
    request.session.login = false;
    response.json({result: "Login failed: username does not exist"});
  } else if (user[0].username === request.body.username && user[0].password === request.body.password) {
    request.session.login = true;
    request.session.username = request.body.username;
    delete user.password;
    response.json({result: user[0]})
  } else {
    request.session.login = false;
    response.json({result: "Login failed: incorrect password"});
  }
});

app.post('/register', async (request, response) => {
  // username, password, team required
  // yog: default this year, recruiting: default false, level: default student
  let user = await usersCollection.find({username: request.body.username}).toArray();
  if (user.length !== 0) {
    request.session.login = false;
    response.json({result: "Username has already been taken. Please try again."});
  } else if (request.body.level) {
    request.session.login = true;
    request.session.username = request.body.username;
    const newUser = {
      'username': request.body.username, 
      'password': request.body.password,
      'yog': request.body.yog,
      'bio' : '',
      'recruiting': request.body.recruiting,
      'level': request.body.level,
      'team': request.body.team
    };
    await usersCollection.insertOne(newUser);
    response.json({result: newUser});
  }
});

app.post('/submit', async (request, response) => {
  let dives = request.body;
  let totalScore = 0;
  const date_competed = new Date();
  const modifiedDives = dives.map(dive => {
    totalScore += dive.award;
    return {
      ...dive,
      qualified: false,
      date_competed
    }
  });
  await diveCollection.insertMany(modifiedDives);
  await totalScoreCollection.insertOne({username: request.session.username, total_score: totalScore, date_earned: date_competed});
  response.sendStatus(200);
});

app.put('/editProfile', async (request, response) => {
  const updatedInfo = request.body;
  await usersCollection.updateOne(
    {username: request.session.username},
    {$set: updatedInfo}
  );
  response.sendStatus(200);
});

ViteExpress.listen(app, 3000);