import mongoose from "mongoose";
import DBUser from "./db_models/db-user";
import DBHabit from "./db_models/db-habit";
import DBHabitOutcome from "./db_models/db-habit-outcome";
import DBUserHabit from "./db_models/db-user-habit";
import { Outcome, Day } from "./models";

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

    public async getUserByUsername(username: string): Promise<{
        username: string,
        password: string,
        successes: number,
        fails: number,
        totalLoggedDays: number} | null> {
        return await DBUser.findOne({ username });
    }

    public async createUser(username: string, password: string) {
        const user = new DBUser({ username, password, totalLoggedDays: 0 });
        await user.save();
    }

    // return the current outcome for a habit on a given day
    public async findHabitOutcomeOnDay(userID: string, habitID: string, day: Day): Promise<Outcome> {
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
    public async howManyHabitsLoggedOnDay(userID: string, day: Day): Promise<number> {
        const records = await DBHabitOutcome.find({
            userID: userID,
            year: day.year,
            month: day.month,
            day: day.day
        });

        return records.length;
    }

    // delete the outcome for a habit on a given day without updating statistics
    private async _deleteHabitOutcomeOnDay(userID: string, habitID: string, day: Day) {
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
    private async _setHabitOutcomeOnDay(userID: string, habitID: string, day: Day, outcome: Outcome) {

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

    public async setHabitOutcome(userID: string, habitID: string, day: Day, outcome: Outcome) {

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