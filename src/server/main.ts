import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Day, UserHabit, UserInfo } from "../../models";
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

  userHabit.name = "Test Habit";

  return userHabit;
}

async function parseUserInfo(userID: mongoose.Types.ObjectId, currentDay: Day): Promise<UserInfo> {
  let userInfo = new UserInfo();

  const user = (await database.getUserByID(userID));

  if (user === null) throw new Error("User not found");

  userInfo.username = user.username;
  userInfo.numLoggedDays = user.totalLoggedDays;

  userInfo.percentSuccessWeek = -1; // TODO: calculate this

  let sum = user.totalSuccesses + user.totalFails;
  userInfo.percentSuccessLifetime = (sum === 0) ? 0 : (user.totalSuccesses / sum);

  const habitIDs = await database.getAllHabitsForUser(userID);
  const habits = [];

  for (const habitID of habitIDs) {
    const {name, description} = (await database.getHabitByID(habitID))!;
    const {totalSuccesses, totalFails, numLoggedDays} = (await database.getUserHabit(userID, habitID))!;

    const sum = totalSuccesses + totalFails;
    const percentSuccessLifetime = (sum === 0) ? 0 : (totalSuccesses / sum);

    habits.push(new UserHabit(name, description, numLoggedDays, -1, percentSuccessLifetime, []));
  }
  userInfo.habits = habits;
  
  return userInfo;
}

app.post("/login", async (req, res) => {

  const result = await auth.login(req.body.username, req.body.password, req, res);
  res.status(result.status).json({message: result.message});

});

app.post("/signup", async (req, res) => {

  const result = await auth.signup(req.body.username, req.body.password, req, res);
  res.status(result.status).json({message: result.message});
  
});

app.post("/habitoutcome", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.body;
  const {userID, habitID, year, month, day, outcome} = data;

  await database.setHabitOutcome(userID, habitID, new Day(year, month, day), outcome);
  res.status(200).json({message: "Habit outcome set successfully"});

});

app.post("/createhabit", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.body;
  const {name} = data;

  await database.createHabit(auth.getUserID(req)!, name);
  res.status(200).json({message: "Habit created successfully"});
  
});


app.get("/userinfo", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.query;
  let {userIDStr, currentYearStr, currentMonthStr, currentDayStr} = data;

  let userID: mongoose.Types.ObjectId;
  if (userIDStr === undefined) {
    console.log("defaulting to logged in user");
    userID = auth.getUserID(req)!;
  } else {
    userID = new mongoose.Types.ObjectId(userIDStr as string);
  }

  const currentYear = parseInt(currentYearStr as string);
  const currentMonth = parseInt(currentMonthStr as string);
  const currentDay = parseInt(currentDayStr as string);

  let output = await parseUserInfo(userID, new Day(currentYear, currentMonth, currentDay));
  res.status(200).json(output);
});

app.get("/userhabit", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.body;
  const {userID, habitID, currentYear, currentMonth, currentDay} = data;

  let output = await parseUserHabit(true, userID, habitID, new Day(currentYear, currentMonth, currentDay));
  res.status(200).json(output);
});


database.connect(username!, password!, () => 
  ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."))
);
