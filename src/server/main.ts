import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();

app.use(morgan('dev')); // log every request to the console
app.use(express.json()); // requests with json data

// Connect to mongodb
require('dotenv').config({ path: __dirname+'/.env' });
const uri = "mongodb+srv://anselychang:" + process.env.MONGODB_PASSWORD + "@ansel.musopg0.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
} as mongoose.ConnectOptions).then(
  (result) => {

    // start listening to requests only after we've successfully connected to the database
    ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));

  }
).catch(
  (err) => console.log(err)
);


app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});


