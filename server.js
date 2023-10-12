const express = require('express'),
    mongodb = require('mongodb'),
    ObjectID = mongodb.ObjectId,
    app = express()

require('dotenv').config();

app.use(express.static('./views/'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// #region Mongodb
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let userID;
const db = client.db(process.env.DB);
let userCollection = db.collection(process.env.DB_USERINFO);


app.post('/login', async(req, res) => {
    userID = await checkLoginInfo(req, res);

    if (userID !== null) {
        res.redirect('app.html');
    } else {
        res.redirect('failedLogin.html');
    }
})
app.post('/logout', async(req, res) => {
    userID = null;
    res.end();
})

app.post('/createAccount', async(req, res) => {
    userID = await checkCreateAccount(req, res);
    if (userID !== null && userID !== undefined) {
        res.redirect('app.html');
    } else {
        res.sendFile(__dirname + '/views/failedSignup.html');
    }
})

const checkCreateAccount = async(req) => {
    let info = await userCollection.findOne({ 'username': req.body.Username });
    if (info === null || info === undefined) {
        let acc = { 'username': req.body.Username, 'password': req.body.Password, 'score': 0, 'rate': 0 };
        let result = await userCollection.insertOne(acc);
        return result.insertedId;
    } else {
        return null;
    }
}

const checkLoginInfo = async(req, res) => {
    let password = req.body.Password;
    let invalidInput = req.body.Username === null && password === null;
    if (!invalidInput) {
        let info = await userCollection.findOne({ 'username': req.body.Username });
        if (info !== null) {
            if (password === info.password) {
                return info._id;
            } else {
                console.log("Incorrect Password");
                res.sendFile(__dirname + '/views/createAccount.html');
                return null;
            }
        } else {
            console.log("No Account Found");
            return null;
        }
    }
}

app.get('/loadUserInfo', async(req, res) => {
    if (userID === undefined || userID === null) {
        res.status(400);
        res.end();
    } else {
        userCollection.find({ _id: userID }).toArray().then(result => {
            res.json(result)
        })
    }
})



app.post('/update', express.json(), async(req, res) => {
    let id = userID;
    if (id === undefined || id === null) {
        res.status(400);
        res.end();
    }
    const result = await userCollection.updateOne({ _id: new ObjectID(id) }, { $set: { score: req.body.score, rate: req.body.rate } });
    res.end();
})


app.listen(3000)