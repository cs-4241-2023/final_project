import mongoose from "mongoose";
import DBUser from "./db_models/db-user";
import DBHabit from "./db_models/db-habit";
import DBHabitOutcome from "./db_models/db-habit-outcome";
import DBUserHabit from "./db_models/db-user-habit";
import { Outcome, Day, HabitOutcome } from "../../models";

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

    public async getOutcomesForMonth(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, year: number, month: number): Promise<HabitOutcome[]> {
        const records = await DBHabitOutcome.find({
            userID: userID,
            habitID: habitID,
            year: year,
            month: month
        });

        const outcomes: HabitOutcome[] = [];
        for (const record of records) {
            const outcome = record.isSuccess ? Outcome.SUCCESS : Outcome.FAIL;
            outcomes.push(new HabitOutcome(record.year, record.month, record.day, outcome));
        }
        return outcomes;
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
        console.log("Deleted:", result)
    }

    // set the outcome for a habit on a given day without updating statistics
    private async _setHabitOutcomeOnDay(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, day: Day, outcome: Outcome) {

        if (outcome === Outcome.NONE) throw new Error("Outcome cannot be NONE");

        // Define filter for finding the record
        const filter = {
            userID: userID,
            habitID: habitID,
            year: day.year,
            month: day.month,
            day: day.day
        };

        // Define the update
        const update = {
            isSuccess: outcome === Outcome.SUCCESS
        };

        // Use findOneAndUpdate with the upsert option set to true
        await DBHabitOutcome.findOneAndUpdate(filter, update, {
            new: true,      // If you want to return the updated object (otherwise it returns the original by default)
            upsert: true    // This creates the object if it doesn't exist
        });
    }

    public async countOutcomeForHabit(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, outcome: Outcome): Promise<number> {

        if (outcome === Outcome.NONE) throw new Error("This method does not support counting NONE outcomes")
        
        const isSuccess = outcome === Outcome.SUCCESS;
        
        const count = await DBHabitOutcome.countDocuments({
            userID: userID,
            habitID: habitID,
            isSuccess: isSuccess
        });

        console.log("habit", isSuccess, count, userID.toString(), habitID.toString());
        return count;
    }

    public async countOutcomeForUser(userID: mongoose.Types.ObjectId, outcome: Outcome): Promise<number> {
            
            if (outcome === Outcome.NONE) throw new Error("This method does not support counting NONE outcomes")
    
            const isSuccess = outcome === Outcome.SUCCESS;

            const count =  await DBHabitOutcome.countDocuments({
                userID: userID,
                isSuccess: isSuccess
            });

            console.log("habit", isSuccess, count, userID.toString());
            return count;
        }

    // add record to HabitOutcome then update statistics:
    // update totalSuccesses/totalFails in UserInfo/UserHabit
    // update numLoggedDays in UserInfo/UserHabit IF new day

    public async setHabitOutcome(userID: mongoose.Types.ObjectId, habitID: mongoose.Types.ObjectId, day: Day, outcome: Outcome) {

        const prevOutcome = await this.findHabitOutcomeOnDay(userID, habitID, day);

        console.log("Previous:", prevOutcome, "New:", outcome);

        if (prevOutcome === outcome) return; // no change

        // remove record if outcome is NONE, otherwise add outcome
        if (outcome === Outcome.NONE) {
            await this._deleteHabitOutcomeOnDay(userID, habitID, day);
        } else {
            await this._setHabitOutcomeOnDay(userID, habitID, day, outcome);
        }

        // update statistics for habit
        const numSuccesses = await this.countOutcomeForHabit(userID, habitID, Outcome.SUCCESS);
        const numFails = await this.countOutcomeForHabit(userID, habitID, Outcome.FAIL);

        // update user habit in database
        await DBUserHabit.findOneAndUpdate(
            { userID: userID, habitID: habitID },
            { totalSuccesses: numSuccesses, totalFails: numFails, numLoggedDays: numSuccesses + numFails },
            { new: true }
        );

        // update statistics for user
        const numSuccessesUser = await this.countOutcomeForUser(userID, Outcome.SUCCESS);
        const numFailsUser = await this.countOutcomeForUser(userID, Outcome.FAIL);

        // update user in database
        await DBUser.findOneAndUpdate(
            { _id: userID },
            { totalSuccesses: numSuccessesUser, totalFails: numFailsUser, totalLoggedDays: numSuccessesUser + numFailsUser },
            { new: true }
        );
    }

    public async setDescription(habitID: mongoose.Types.ObjectId, description: string) {

        await DBHabit.findOneAndUpdate(
            { _id: habitID },
            { description: description },
            { new: true }
        );
    }
}