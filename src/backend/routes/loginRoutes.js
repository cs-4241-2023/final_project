const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let usersCollection;

client.connect(err => {
    usersCollection = client.db("test").collection("users");
});

router.post("/login", async (req, res) => {
    // Find user within MongoDB
    console.log(req.body.usernames)

    const response = await usersCollection.findOne({
        username: req.body.username,
    });

    console.log(response)

    if (response !== null) {
        if (response.password === req.body.password) {
            // TODO: figure out the cookie because brandon is stupid
            req.session.user = req.body.username
            console.log("login success")
            res.status(200);
            res.end();
        }
        else {
            console.log("incorrect password");
            res.status(401);
            res.end();
        }
    }
    else {
        console.log("user not found")
        res.status(404);
        res.end
    }
})

module.exports = router;