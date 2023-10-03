import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import morgan from "morgan";
import { UserHabit, UserInfo } from "./models";
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

async function parseUserHabit(includeOutcomes: boolean): Promise<UserHabit> {
  let userHabit = new UserHabit();

  return userHabit;
}

async function parseUserInfo(userID: string, currentYear: number, currentMonth: number, currentDay: number): UserInfo {
  let userInfo = new UserInfo();

  const user = (await database.getUserByUsername(userID));

  if (user === null) throw new Error("User not found");

  userInfo.username = user.username;
  userInfo.numLoggedDays = user.totalLoggedDays;

  userInfo.percentSuccessWeek = -1; // TODO: calculate this

  userInfo.percentSuccessLifetime = user.successes / (user.successes + user.fails);
  
  return userInfo;
}


app.get("/userinfo", (req, res) => {

  const data = req.body;
  const {userID, currentYear, currentMonth, currentDay} = data;

  let output = parseUserInfo(userID, currentYear, currentMonth, currentDay);
  res.status(200).json(output);
});

database.connect(username!, password!, () => 
  ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."))
);
