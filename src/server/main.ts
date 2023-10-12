import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import { Day, HabitOutcome, Outcome, UserHabit, UserInfo } from "../../models";
import { Authentication } from "./authentication";
import { Database } from "./database";

const app = express();

app.use(express.json()); // requests with json data

require('dotenv').config({ path: __dirname+'/.env' });
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const database = new Database();
const auth = new Authentication(app, database);

async function getStreakFor(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, currentDay: Day): Promise<number> {
  let streak = 0;

  while (true) {
    const outcome = await database.findHabitOutcomeOnDay(userID, habitID, currentDay);
    if (outcome !== Outcome.SUCCESS) break;
    streak++;
    currentDay = currentDay.previous();
  }
  return streak;
}

async function getWeekSuccess(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, currentDay: Day): Promise<[number, number]> {
  let successes = 0;
  let loggedDays = 0;

  for (let i = 0; i < 7; i++) {
    const outcome = await database.findHabitOutcomeOnDay(userID, habitID, currentDay);
    if (outcome === Outcome.SUCCESS) successes++;
    if (outcome !== Outcome.NONE) loggedDays++;
    currentDay = currentDay.previous();
  }
  return [successes, loggedDays];
}

async function parseUserHabit(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, currentDay: Day): Promise<UserHabit | undefined> {

  console.log("parseUserHabit", userID, habitID, currentDay);

  let userHabit = new UserHabit(userID.toString(), habitID.toString());
  
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

  userHabit.currentStreak = await getStreakFor(userID, habitID, currentDay);
  [userHabit.numSuccessesWeek, userHabit.numLoggedDaysWeek] = await getWeekSuccess(userID, habitID, currentDay);

  let sum = habitInfo.totalSuccesses + habitInfo.totalFails;
  userHabit.percentSuccessLifetime = (sum === 0) ? 0 : +(((habitInfo.totalSuccesses / sum) * 100).toFixed(2));

  return userHabit;
}

async function parseUserInfo(userID: mongoose.Types.ObjectId, currentDay: Day): Promise<UserInfo> {
  let userInfo = new UserInfo();

  const user = (await database.getUserByID(userID));

  if (user === null) throw new Error("User not found");

  userInfo.username = user.username;
  userInfo.numLoggedDays = user.totalLoggedDays;

  let sum = user.totalSuccesses + user.totalFails;
  userInfo.percentSuccessLifetime = (sum === 0) ? 0 : +(((user.totalSuccesses / sum) * 100).toFixed(2));

  const habitIDs = await database.getAllHabitsForUser(userID);
  const habits = [];

  for (const habitID of habitIDs) {
    habits.push((await parseUserHabit(userID, habitID, currentDay))!);
  }
  userInfo.habits = habits;

  let loggedDaysWeek = 0;
  let successesWeek = 0;
  for (const habit of habits) {
    loggedDaysWeek += habit.numLoggedDaysWeek;
    successesWeek += habit.numSuccessesWeek;
  }
  userInfo.percentSuccessWeek = (loggedDaysWeek === 0) ? 0 : +(((successesWeek / loggedDaysWeek)*100).toFixed(2));
  
  return userInfo;
}

// if userIDStr is undefined, use the logged in user
function convertStrToUserID(req: express.Request, userIDStr: string | undefined): mongoose.Types.ObjectId {
  if (userIDStr === undefined || userIDStr === "undefined") {
    return auth.getUserID(req)!;
  } else {
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
  const {habitID, year, month, day, outcome} = data;

  await database.setHabitOutcome(auth.getUserID(req)!, habitID, new Day(year, month, day), outcome);
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

app.post("/setdescription", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.body;
  const {habitID, description} = data;

  await database.setDescription(habitID, description);
  res.status(200).json({message: "Description set successfully"});


});

app.post("/deletehabit", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.body;
  const {habitID} = data;

  const habitIDObj = convertStrToHabitID(habitID as string);

  await database.deleteHabit(auth.getUserID(req)!, habitIDObj);
  res.status(200).json({message: "Habit deleted successfully"});

});


app.get("/userinfo", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.query;
  let {userID, currentYear, currentMonth, currentDay} = data;
  const userIDObj = convertStrToUserID(req, userID as (string | undefined));

  const currentYearObj = parseInt(currentYear as string);
  const currentMonthObj = parseInt(currentMonth as string);
  const currentDayObj = parseInt(currentDay as string);

  let output = await parseUserInfo(userIDObj, new Day(currentYearObj, currentMonthObj, currentDayObj));
  res.status(200).json(output);
});

app.get("/userhabit", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.query;
  const {userID, habitID, currentYear, currentMonth, currentDay} = data;

  const userIDObj = convertStrToUserID(req, userID as (string | undefined));
  const habitIDObj = convertStrToHabitID(habitID as string);

  const currentYearObj = parseInt(currentYear as string);
  const currentMonthObj = parseInt(currentMonth as string);
  const currentDayObj = parseInt(currentDay as string);

  let output = await parseUserHabit(userIDObj, habitIDObj, new Day(currentYearObj, currentMonthObj, currentDayObj));
  console.log(output);

  if (output === undefined) {
    res.status(404).json({message: "Habit not found"});
    return;
  }

  res.status(200).json(output);
});

app.get("/outcomes", async (req, res) => {

  if (!auth.isLoggedIn(req)) { // if not logged in, redirect to login page
    res.status(401).json({message: "Not logged in"});
    return;
  }

  const data = req.query;
  const {userID, habitID, year, month} = data;

  const userIDObj = convertStrToUserID(req, userID as (string | undefined));
  const habitIDObj = convertStrToHabitID(habitID as string);
  const intYear = parseInt(year as string);
  const intMonth = parseInt(month as string);
  const outcomes = await database.getOutcomesForMonth(userIDObj, habitIDObj, intYear, intMonth);

  res.status(200).json(outcomes);

});

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

database.connect(username!, password!, () => 
  ViteExpress.listen(app, PORT, () => console.log("Server is listening on port", PORT))
);
