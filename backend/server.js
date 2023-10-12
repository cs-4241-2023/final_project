require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();

const { connectToDatabase } = require('./mongodb');
const { client } = require('./mongodb');
const UserModel = require('./models/user');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(require('express-session')({ secret: process.env.SESSION_ID, resave: true, saveUninitialized: true }));
app.use(cors());

connectToDatabase();

let userId = '';

// create db from client
const usersDB = client.db("Users");

app.get('/session', (req, res) => {
    if (req.session.login === undefined) {
        res.json({ login: false });
    } else {
        res.json({ login: req.session.login });
    }
});

app.post('/register', async (req, res) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const formUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        favoriteLocations: [],
    });

    // Only add user if a they don't exist
    const findUser = await usersDB.collection('data').findOne({ email: req.body.email });

    if (findUser !== null) {
        console.log("Account with email entered is already registered! Please use a different email address.")
        res.sendStatus(404);
    } else {
        console.log("Registering the following user");

        usersDB.collection("data").insertOne(formUser);
        req.session.user = formUser['email'].toLowerCase();
        req.session.username = formUser['username'].toUpperCase();
        console.log("User has been added")
        res.sendStatus(200);
    }
});

app.post('/login', async (req, res) => {
    const userEmail = req.body.email;

    const findUser = await usersDB.collection('data').findOne({ email: userEmail });

    console.log("User found");
    //console.log(findUser);

    if (findUser !== null) {
        // grab user hash pass and match it with req.body.pass
        const inputtedPass = req.body.password;

        console.log("Inputted pass");
        console.log(inputtedPass);

        const passOnDb = findUser['password'];

        console.log("pass on db");
        console.log(passOnDb);

        bcrypt.compare(inputtedPass, passOnDb, (err, result) => {
            if (err) {
                throw err;
            }
            if (result) {
                req.session.login = true;
                req.session.user = findUser['email'].toLowerCase();
                req.session.username = findUser['username'].toUpperCase();
                console.log("login successful1")
                // res.redirect("/home");
                userId = findUser['email'].toLowerCase();
                res.sendStatus(200);
            } else {
                // res.render("login.ejs", {
                //     error: "Incorrect username or password",
                // });
                console.log("Incorrect username or password");
                res.sendStatus(404);

                console.log("Incorrect username or password");
            }
        });

    } else {
        res.sendStatus(404);
        // res.render("login.ejs", { error: "Incorrect username or password" });
    }
})

app.post('/add-favorite-location', async (req, res) => {

    const locationName = req.body.locationName;

    try {
        const user = await usersDB.collection('data').findOne({ email: userId });
        if (user) {
            user.favoriteLocations.push(locationName);
            usersDB.collection('data').findOneAndUpdate({ email: userId }, { $set: user });
           /*
            const user2 = await usersDB.collection('data').findOne({ email: userId });
            console.log("user after updating favorite locations");
            console.log(user2);
            */
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error adding favorite location:', error);
        res.sendStatus(500);
    }
});


app.post('/remove-favorite-location', async (req, res) => {
    const locationName = req.body.locationName;

    try {
        const user = await usersDB.collection('data').findOne({ email: userId });

        if (user) {
            user.favoriteLocations = user.favoriteLocations.filter(
                (location) => location.locationName.trim().toLowerCase() !== locationName.trim().toLowerCase()
            );            
            
            const update = {
                $set: { favoriteLocations: user.favoriteLocations },
            };
            await usersDB.collection('data').findOneAndUpdate({ email: userId }, update);

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error removing favorite location:', error);
        res.sendStatus(500);
    }
});




app.get('/get-favorite-locations', async (req, res) => {

    try {
        const user = await usersDB.collection('data').findOne({ email: userId });

        if (user) {
            res.json(user.favoriteLocations);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error getting favorite locations:', error);
        res.sendStatus(500);
    }
});


app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`);
});