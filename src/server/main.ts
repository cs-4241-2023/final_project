import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Day, UserHabit, UserInfo } from "./models";
import { Authentication } from "./authentication";
import { Database } from "./database";

const app = express();

app.use(morgan('dev')); // log every request to the console
app.use(express.json()); // requests with json data

require('dotenv').config({ path: __dirname+'/.env' });
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const database = new Database();
const auth = new Authentication(app, database);

async function parseUserHabit(includeOutcomes: boolean, userID: string, habitID: string, currentDay: Day): Promise<UserHabit> {
  let userHabit = new UserHabit();

  return userHabit;
}

async function parseUserInfo(userID: string, currentDay: Day): Promise<UserInfo> {
  let userInfo = new UserInfo();

  const user = (await database.getUserByUsername(userID));

  if (user === null) throw new Error("User not found");

  userInfo.username = user.username;
  userInfo.numLoggedDays = user.totalLoggedDays;

  userInfo.percentSuccessWeek = -1; // TODO: calculate this

  userInfo.percentSuccessLifetime = user.successes / (user.successes + user.fails);
  
  return userInfo;
}

app.get("/login", (req, res) => {

  auth.login(req.body.username, req.body.password, req, res).then((result) => {
    res.status(result.status).json({message: result.message});
  });
});

app.get("/signup", (req, res) => {

  auth.signup(req.body.username, req.body.password, req, res).then((result) => {
    res.status(result.status).json({message: result.message});
  });
});


app.get("/userinfo", (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.redirect('/');
    return;
  }

  const data = req.body;
  const {userID, currentYear, currentMonth, currentDay} = data;

  let output = parseUserInfo(userID, new Day(currentYear, currentMonth, currentDay));
  res.status(200).json(output);
});

app.get("/userhabit", (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.redirect('/');
    return;
  }

  const data = req.body;
  const {userID, habitID, currentYear, currentMonth, currentDay} = data;

  let output = parseUserHabit(true, userID, habitID, new Day(currentYear, currentMonth, currentDay));
  res.status(200).json(output);
});

database.connect(username!, password!, () => 
  ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."))
);
