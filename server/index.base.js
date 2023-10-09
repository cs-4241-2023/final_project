const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { createServer: createViteServer } = require('vite');
const dotenv = require('dotenv');
const path = require('path');

const { storageService } = require('./services/storage.service');

dotenv.config();

const app = express();
const server_port = process.env.PORT || 3000;
const express_session_token = process.env.EXPRESS_SESSION_TOKEN;

app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: express_session_token,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await storageService.findUserByUsername(username);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const isValidPassword = bcrypt.compareSync(password, user.hashedPassword);
        if (!isValidPassword) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await storageService.findUserById(id);
    done(null, user);
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});

app.post('/register', async (req, res) => {
    const { username, password, confirmPassword, firstName, lastName } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }
    const existingUser = await storageService.findUserByUsername(username);
    if (existingUser) {
        return res.status(400).send('Username already taken');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await storageService.createUser(username, hashedPassword, firstName, lastName);
    req.login(user, err => {
        if (err) { return res.status(500).send(err.message); }
        return res.json(user);
    });
});

app.post('/checkUsername', async (req, res) => {
    const { username } = req.body;
    console.log(username)
    const existingUser = await storageService.findUserByUsername(username);
    console.log("Existing User", existingUser)
    if (existingUser) {
        return res.status(400).send('Username already taken');
    }
    return res.status(200).send("Username available")
})

app.post('/logout', (req, res) => {
    req.logout(() => {
        res.sendStatus(200);
    });
});

app.post('/add', async (req, res) => {
    const { username, color, face, hat, shirt, name, skills, food, slogan } = req.body
    const character = await storageService.saveCharacter(username, color, face, hat, shirt, name, skills, food, slogan);
    return res.json(character);
})

app.post('/update', async (req, res) => {
    const { _id, username, color, face, hat, shirt, name, skills, food, slogan } = req.body
    const character = await storageService.updateCharacter(_id, username, color, face, hat, shirt, name, skills, food, slogan);
    return res.json(character);
})

app.get('/user-info', (req, res) => {
    res.json(req.user);
})

app.get('/user-characters', (req, res) => {

    const body = [
        {
            "_id": 1,
            "name": "Character 1",
            "skills": ["Skill 1", "Skill 2"],
            "food": "Food 1",
            "slogan": "Slogan 1",
            "color": "allCharStuff/bases/base9.png",
            "hat": "allCharStuff/hats/hat7.png",
            "shirt": "allCharStuff/shirts/shirt6.png",
            "face": "allCharStuff/faces/face5.png",

        },
        {
            "_id": 2,
            "name": "Character 2",
            "skills": ["Skill 1", "Skill 2"],
            "food": "Food 1",
            "slogan": "Slogan 1",
            "color": "allCharStuff/bases/base6.png",
            "hat": "allCharStuff/hats/hat6.png",
            "shirt": "allCharStuff/shirts/shirt4.png",
            "face": "allCharStuff/faces/face5.png",

        }
    ];

    res.json(body);
})

app.post('/delete', async (req, res) => {
    const characterId = req.body.characterId;
    try {
        const deletedCount = await storageService.deleteCharacter(characterId);
        if (deletedCount && deletedCount > 0) {
            res.status(200).send({ message: 'Deleted successfully' });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (err) {
        console.error('Error deleting: ', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});


module.exports = { app, server_port, express, path };
