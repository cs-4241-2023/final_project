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
app.use(express.static('/../build')); // serve static files in public


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


const sendFile = function(res, filename) {
  const fullFilename = path.join(__dirname + '/../build/' + filename); // go up a directory and then into public folder
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

app.get('*', (req, res) => {
  console.log("get *", req.url);
  sendFile(res, 'index.html');
});