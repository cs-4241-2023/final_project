const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mime = require('mime');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev')); // log every request to the console
app.use(express.json()); // requests with json data
app.use(express.static('public')); // serve static files in public

const User = require('../db_models/User.js');


// Connect to mongodb
require('dotenv').config();
const uri = "mongodb+srv://anselychang:" + process.env.MONGODB_PASSWORD + "@ansel.musopg0.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  (result) => {
    console.log("connected to db");

    // start listening to requests only after we've successfully connected to the database
    app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

  }
).catch(
  (err) => console.log(err)
);


// Use sessions for tracking logins
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false }
}));

// redirect to login page if not logged in
const verifyLogin = function(req, res) {
  if(!req.session.username) {
    console.log("not logged in");
    res.redirect('/');
    return false;
  }
  return true;
}

const sendFile = function(res, filename) {
  const fullFilename = path.join(__dirname + '/../public/' + filename); // go up a directory and then into public folder
  console.log("sendFile", fullFilename);
  const type = mime.getType(fullFilename);

  fs.readFile(fullFilename, (err, content) => {
    if (err === null) {
      res.set('Content-Type', type);
      res.send(content);
    } else {
      res.status(404).send('404 Error: File Not Found');
    }
  });
};

app.get('/home', (req, res) => {
  if (!verifyLogin(req, res)) return;
  sendFile(res, 'home.html');
});

app.get('*', (req, res) => {
  console.log("get *", req.url);
  sendFile(res, 'login.html');
});

// login user
// Format: {username: [string], password: [string]}
app.post('/login', async (req, res) => {

  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });

    if (!user || password !== user.password) {
      console.log('Invalid username or password');
      return res.json({status: 400, message: 'Invalid username or password'});
    }

    console.log('User logged in successfully');
    req.session.username = username; // store username in session
    return res.json({status: 200, message: 'User loged in successfully'});

  } catch (error) {
    console.log(error);
    return res.json({status: 500, message: 'Internal Server Error'});
  }

});

// Sign up a new account
app.post('/signup', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log('User already exists');
      return res.json({status: 400, message: 'User already exists'});

    }

    const user = new User({ username: username, password: password, caloriesGoal: 3000, proteinGoal: 150 });
    await user.save();

    console.log('User signed up successfully');
    req.session.username = username; // store username in session
    return res.json({status: 200, message: 'User signed up in successfully'});

  } catch (error) {
    console.log(error);
    return res.json({status: 500, message: 'Internal Server Error'});
  }
});

// logout
app.post('/logout', (req, res) => {
  console.log("logout");
  req.session.destroy();
  res.redirect('/');
});
