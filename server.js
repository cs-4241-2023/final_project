import express from  'express'
import ViteExpress from 'vite-express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import cookieSession from 'cookie-session'
import bcrypt from 'bcryptjs'

dotenv.config()

//Build system Vite will handle static routes (GET requests) for us.
const app = express()
app.use(express.json())

app.use(cookieSession({
  name: 'session', //the name of the cookie to set
  keys: ['key1', 'key2'] //The list of keys to use to sign & verify cookie values. Set cookies are always signed with keys[0], while the other keys are valid for verification, allowing for key rotation.
}))

//Application data structure:

/*
Simplified Data Structure - let's go with this:
const user = {
username: 'john',
password: 'pw',
musictourname: 'Judgement Day', //Daniel
tourduration: 50 days, //Adish
tourcontinent: 'Europe', //Matthew
targetaudienceagerange: '15-30', //Sean
headliningartist: 'Limp Bizkit' //Sultan
directsupportartist: 'Taylor Swift' //Adish
}
*/

//Note in README that we simplified the scope of the editable list feature.

//Client-side rendered application using React. Server only functions to interact with the client via HTTP protocal.

let userData = {}

//MongoDB Connection

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let collection = null

async function run() { 
  await client.connect()
  collection = await client.db("FantasyMusicTourBuilderData").collection("FantasyMusicToursPerUser")
}
run()

app.use((req, res, next) => { 
  if(collection !== null) {
    console.log("Collection has been assigned.")
    next() //The next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack. If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  }else{
    console.log("Collection is null.") //Middleware stack stops at this point
  }
})

//User data operations and helper functions:

//Server-side form validation for username and password

function usernameOrPasswordHasMissingField(un, pw) {
  if(un.trim().length === 0 || pw.trim().length === 0) {
    return true
  } else {
    return false
  }
}

function getFirstIndexOfStringWhiteSpace(inputString) { //The indexOf() method returns the position of the first occurrence of a value in a string.
  return inputString.indexOf(' ')
}

function usernameOrPasswordHasWhiteSpace(un, pw) {
  if(getFirstIndexOfStringWhiteSpace(un) >= 0 || getFirstIndexOfStringWhiteSpace(pw) >= 0) {
    return true
  } else {
    return false
  }
}

function getDuplicateUsernameCount(newUsername, usersList) { 
  
  let duplicateUsernameCounter = 0

  if(usersList.length !== 0) {
    usersList.forEach(u => {
      if(u.usern === newUsername) {
        duplicateUsernameCounter++
      }
    })
  }

  return duplicateUsernameCounter
}

app.post('/userCreation', async (req, res) => {
  const allUsers = await collection.find({}, {usern: 1, _id: 0}).toArray() 

  if(usernameOrPasswordHasMissingField(req.body.username, req.body.password)) {
    return res.end("MissingInformation")
  }
  else if(usernameOrPasswordHasWhiteSpace(req.body.username, req.body.password)) {
    return res.end("WhitespacePresent")
  }
  else if(getDuplicateUsernameCount(req.body.username, allUsers) === 0) { 
    try {
      const salt = await bcrypt.genSalt(10) //A salt is a random data that is used as an additional input to a one-way function that hashes data
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
      await collection.insertOne({usern: req.body.username, passw: hashedPassword}) 
      return res.status(201).end("SuccessfulUserCreation")
    } catch {
      return res.end("ServerError")
    }
  } else {
      return res.end("UsernameAlreadyExists")
  }
})

app.post('/userLogin', async (req, res) => {
  
  if(usernameOrPasswordHasMissingField(req.body.username, req.body.password)) {
    return res.end("MissingInformation")
  }
  else if(usernameOrPasswordHasWhiteSpace(req.body.username, req.body.password)) {
    return res.end("WhitespacePresent")
  } else {
    userData = await collection.find({usern: req.body.username}).toArray()

    if(typeof userData !== undefined && userData.length === 0) {
      return res.status(404).end("UserNotFound")
    }

    try {
      if(await bcrypt.compare(req.body.password, userData[0].passw)) { //prevents timing attacks
        req.session.login = true
        return res.end("SuccessfulUserAuthentication.")
      } else {
        req.session.login = false
        return res.end("IncorrectPassword")
      }
    } catch {
      return res.status(500).end("InternalServerError")
    }
  }
})

//GET Requests

app.get('/getMusicTourName', async (req, res) => {
  res.end(userData[0].fantasymusictour.tourname)
})

app.get('/getMusicTourDuration', async (req, res) => {
  res.end(userData[0].fantasymusictour.tourduration)
})

app.get('/getMusicTourContinent', async (req, res) => {
  res.end(userData[0].fantasymusictour.tourcontinent)
})

app.get('/getMusicTourTargetAudienceAgeRange', async (req, res) => {
  res.end(userData[0].fantasymusictour.targetaudienceagerange)
})

app.get('/getMusicTourHeadliningArtist', async (req, res) => {
  res.end(userData[0].fantasymusictour.headliningartist)
})

app.get('/getMusicTourDirectSupportArtist', async (req, res) => {
  res.end(userData[0].fantasymusictour.directsupportartist)
})

//PUT Requests

app.put('/modifyTourName', async (req, res) => { 
  
  userData[0].fantasymusictour.tourname = req.body.tourname
  await collection.updateOne({usern: userData[0].usern}, {$set: {'fantasymusictour.tourname': userData[0].fantasymusictour.tourname}}) 
  res.end("Tour Name has been successfully updated.")
})

app.put('/modifyTourDuration', async (req, res) => { 
  
  userData[0].fantasymusictour.tourduration = req.body.tourduration
  await collection.updateOne({usern: userData[0].usern}, {$set: {'fantasymusictour.tourduration': userData[0].fantasymusictour.tourduration}})
  res.end("Tour Duration has been successfully updated.")
})

app.put('/modifyTourContinent', async (req, res) => { 
  
  userData[0].fantasymusictour.tourcontinent = req.body.tourcontinent
  await collection.updateOne({usern: userData[0].usern}, {$set: {'fantasymusictour.tourcontinent': userData[0].fantasymusictour.tourcontinent}})
  res.end("Tour Continent has been successfully updated.")
})

app.put('/modifyTargetAudienceAgeRange', async (req, res) => { 
  
  userData[0].fantasymusictour.targetaudienceagerange = req.body.targetaudienceagerange
  await collection.updateOne({usern: userData[0].usern}, {$set: {'fantasymusictour.targetaudienceagerange': userData[0].fantasymusictour.targetaudienceagerange}})
  res.end("Target Audience Age Range has been successfully updated.")
})

app.put('/modifyHeadliningArtist', async (req, res) => { 
  
  userData[0].fantasymusictour.headliningartist = req.body.headliningartist
  await collection.updateOne({usern: userData[0].usern}, {$set: {'fantasymusictour.headliningartist': userData[0].fantasymusictour.headliningartist}})
  res.end("Headlining Artist has been successfully updated.")
})

app.put('/modifyDirectSupportArtist', async (req, res) => { 
  
  userData[0].fantasymusictour.directsupportartist = req.body.directsupportartist
  await collection.updateOne({usern: userData[0].usern}, {$set: {'fantasymusictour.directsupportartist': userData[0].fantasymusictour.directsupportartist}})
  res.end("Direct Supporting Artist has been successfully updated.")
})

ViteExpress.listen(app, 3000)