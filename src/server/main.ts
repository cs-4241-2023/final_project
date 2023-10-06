import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import morgan from "morgan";
import { Day, HabitOutcome, Outcome, UserHabit, UserInfo } from "../../models";
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

async function parseUserHabit(includeOutcomes: boolean, userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, currentDay: Day): Promise<UserHabit | undefined> {
  let userHabit = new UserHabit(habitID.toString());
  
  const habit = await database.getHabitByID(habitID);
  if (habit === undefined) {
    console.log("Habit not found", habitID);
    return undefined;
  }

  const habitInfo = await database.getUserHabit(userID, habitID);
  if (habitInfo === undefined) {
    console.log("User habit not found", userID, habitID);
    return undefined;
  }

  userHabit.name = habit.name;
  userHabit.description = habit.description;
  userHabit.numLoggedDays = habitInfo.numLoggedDays;

  userHabit.currentStreak = -1; // TODO: calculate this
  userHabit.percentSuccessWeek = -1; // TODO: calculate this
  userHabit.percentSuccessLifetime = -1; // TODO: calculate this

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

    // TODO: calculate these
    const currentStreak = 0;
    const outcomes: HabitOutcome[] = [];

    habits.push(new UserHabit(habitID.toString(), name, description, currentStreak, numLoggedDays, -1, percentSuccessLifetime, outcomes));
  }
  userInfo.habits = habits;
  
  return userInfo;
}

// if userIDStr is undefined, use the logged in user
function convertStrToUserID(req: express.Request, userIDStr: string | undefined): mongoose.Types.ObjectId {
  if (userIDStr === undefined || userIDStr === "undefined") {
    console.log("defaulting to logged in user");
    return auth.getUserID(req)!;
  } else {
    console.log("converting", userIDStr, typeof userIDStr);
    return new mongoose.Types.ObjectId(userIDStr as string);
  }
}

function convertStrToHabitID(habitIDStr: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(habitIDStr as string);
}

app.post("/login", async (req, res) => {

  const result = await auth.login(req.body.username, req.body.password, req, res);
  res.status(result.status).json({message: result.message});

});

app.post("/signup", async (req, res) => {

  const result = await auth.signup(req.body.username, req.body.password, req, res);
  res.status(result.status).json({message: result.message});
  
});

app.post("/logout", async (req, res) => {

  const result = await auth.logout(req, res);
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
  const userID = convertStrToUserID(req, userIDStr as (string | undefined));

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

  const data = req.query;
  console.log("recieved", data);
  const {userID, habitID, currentYearStr, currentMonthStr, currentDayStr} = data;

  console.log("string userID", userID);
  console.log("string habitID", habitID);

  const userIDObj = convertStrToUserID(req, userID as (string | undefined));
  const habitIDObj = convertStrToHabitID(habitID as string);

  console.log("converted userID", userID, "to", userIDObj);
  console.log("converted habitID", habitID, "to", habitIDObj);

  const currentYear = parseInt(currentYearStr as string);
  const currentMonth = parseInt(currentMonthStr as string);
  const currentDay = parseInt(currentDayStr as string);

  let output = await parseUserHabit(true, userIDObj, habitIDObj, new Day(currentYear, currentMonth, currentDay));
  console.log(output);

  if (output === undefined) {
    res.status(404).json({message: "Habit not found"});
    return;
  }

  res.status(200).json(output);
});


database.connect(username!, password!, () => 
  ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."))
);
