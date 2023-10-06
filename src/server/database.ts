import mongoose from "mongoose";
import DBUser from "./db_models/db-user";
import DBHabit from "./db_models/db-habit";
import DBHabitOutcome from "./db_models/db-habit-outcome";
import DBUserHabit from "./db_models/db-user-habit";
import { Outcome, Day } from "../../models";

export class Database {
    constructor() {

    }

    // Connect to mongodb
    public connect(username: string, password: string, onConnect: () => {}) {

        
        const uri = "mongodb+srv://" + username + ":" + password + "@cluster0.rddihge.mongodb.net/?retryWrites=true&w=majority";
        console.log(uri);
        mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
        } as mongoose.ConnectOptions).then(
            (result) => onConnect()
        ).catch(
            (err) => console.log(err)
        );
    }

    public async getUserByID(userID: mongoose.Types.ObjectId): Promise<{
        _id: mongoose.Types.ObjectId,
        username: string,
        password: string,
        totalSuccesses: number,
        totalFails: number,
        totalLoggedDays: number} | null> {
        return await DBUser.findOne({ _id : userID });
    }

    public async getUserByUsername(username: string): Promise<{
        _id: mongoose.Types.ObjectId,
        username: string,
        password: string,
        totalSuccesses: number,
        totalFails: number,
        totalLoggedDays: number} | null> {
        return await DBUser.findOne({ username : username });
    }

    public async createUser(username: string, password: string): Promise<mongoose.Types.ObjectId> {
        const user = new DBUser({ 
            username: username,
            password: password,
            totalSuccesses: 0, 
            totalFails: 0,
            totalLoggedDays: 0
        });
        console.log("creating", user);
        await user.save();
        return user._id;
    }

    // get habit name and description by habitID
    public async getHabitByID(habitID: mongoose.Types.ObjectId): Promise<{
        name: string,
        description: string } | undefined>
    {
        const record = await DBHabit.findOne({ _id: habitID });

        if (record === null) return undefined;
        else return { name: record.name, description: record.description };
    }


    // return a list of HabitIDs for a given user
    public async getAllHabitsForUser(userID: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[]> {
        const records = await DBUserHabit.find({ userID: userID });
        return records.map(record => record.habitID);
    }

    // get habit stats for a user by userID and habitID
    public async getUserHabit(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId): Promise<{
        totalSuccesses: number,
        totalFails: number,
        numLoggedDays: number } | undefined>
    {
        const record = await DBUserHabit.findOne({ userID: userID, habitID: habitID });

        if (record === null) return undefined;
        else return { totalSuccesses: record.totalSuccesses, totalFails: record.totalFails, numLoggedDays: record.numLoggedDays };
    }

    // create new habit
    public async createHabit(userID: mongoose.Types.ObjectId, name: string): Promise<mongoose.Types.ObjectId> {
        const habit = new DBHabit({ name: name, description: "[Enter description here]"});
        await habit.save();

        // add user to habit
        const userHabit = new DBUserHabit({ userID: userID, habitID: habit._id, totalSuccesses: 0, totalFails: 0, numLoggedDays: 0 });
        await userHabit.save();

        return habit._id;
    }


    // return the current outcome for a habit on a given day
    public async findHabitOutcomeOnDay(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, day: Day): Promise<Outcome> {
        const record = await DBHabitOutcome.findOne({
            userID: userID,
            habitID: habitID,
            year: day.year,
            month: day.month,
            day: day.day
        });

        if (record === null) return Outcome.NONE;
        else return record.isSuccess ? Outcome.SUCCESS : Outcome.FAIL;
    }

    // how many total outcomes across ALL of a user's habits on a given day
    public async howManyHabitsLoggedOnDay(userID: mongoose.Types.ObjectId, day: Day): Promise<number> {
        const records = await DBHabitOutcome.find({
            userID: userID,
            year: day.year,
            month: day.month,
            day: day.day
        });

        return records.length;
    }

    // delete the outcome for a habit on a given day without updating statistics
    private async _deleteHabitOutcomeOnDay(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, day: Day) {
        const result = await DBHabitOutcome.findOneAndDelete({
            userID: userID,
            habitID: habitID,
            year: day.year,
            month: day.month,
            day: day.day
          });

        if (result === null) throw new Error("No record found");
    }

    // set the outcome for a habit on a given day without updating statistics
    private async _setHabitOutcomeOnDay(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, day: Day, outcome: Outcome) {

        if (outcome === Outcome.NONE) throw new Error("Outcome cannot be NONE");

        const record = new DBHabitOutcome({
            userID: userID,
            habitID: habitID,
            year: day.year,
            month: day.month,
            day: day.day,
            isSuccess: outcome === Outcome.SUCCESS
        });
        await record.save();
    }


    // add record to HabitOutcome then update statistics:
    // update totalSuccesses/totalFails in UserInfo/UserHabit
    // update numLoggedDays in UserInfo/UserHabit IF new day

    public async setHabitOutcome(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, day: Day, outcome: Outcome) {

        const prevOutcome = await this.findHabitOutcomeOnDay(userID, habitID, day);
        if (prevOutcome === outcome) return; // no change

        // calculate whether to increment/decrement successes/fails
        let successDelta = 0;
        let failDelta = 0;
        if (prevOutcome === Outcome.SUCCESS) successDelta--;
        else if (prevOutcome === Outcome.FAIL) failDelta--;
        if (outcome === Outcome.SUCCESS) successDelta++;
        else if (outcome === Outcome.FAIL) failDelta++; 
        
        // calculate whether to increment/decrement numLoggedDays for HABIT
        let habitDaysLoggedDelta = 0;
        if (prevOutcome === Outcome.NONE && outcome !== Outcome.NONE) habitDaysLoggedDelta++;
        else if (prevOutcome !== Outcome.NONE && outcome === Outcome.NONE) habitDaysLoggedDelta--;

        // calculate whether to increment/decrement numLoggedDays for USER
        let userDaysLoggedDelta = 0;
        const numOutcomesLoggedOnDay = await this.howManyHabitsLoggedOnDay(userID, day);
        if (numOutcomesLoggedOnDay === 0 && outcome !== Outcome.NONE) userDaysLoggedDelta++;
        else if (numOutcomesLoggedOnDay === 1 && outcome === Outcome.NONE) userDaysLoggedDelta--;

        // remove record if outcome is NONE, otherwise add outcome
        if (outcome == Outcome.NONE) {
            this._deleteHabitOutcomeOnDay(userID, habitID, day);
        } else {
            this._setHabitOutcomeOnDay(userID, habitID, day, outcome);
        }

        // increment totalSuccesses/totalFails in both UserInfo and UserHabit
        if (successDelta !== 0 || failDelta !== 0) {
            await DBUserHabit.updateOne(
                { userID: userID, habitID: habitID },
                { $inc: { totalSuccesses: successDelta, totalFails: failDelta } }
            );
            await DBUser.updateOne(
                { username: userID },
                { $inc: { totalSuccesses: successDelta, totalFails: failDelta } }
            );
        }

        // increment/decrement numLoggedDays in UserHabit
        if (habitDaysLoggedDelta !== 0) {
            await DBUserHabit.updateOne(
                { userID: userID, habitID: habitID },
                { $inc: { numLoggedDays: habitDaysLoggedDelta } }
            );
        }

        // increment/decrement numLoggedDays in UserInfo
        if (userDaysLoggedDelta !== 0) {
            await DBUser.updateOne(
                { username: userID },
                { $inc: { totalLoggedDays: userDaysLoggedDelta } }
            );
        }

    }

}