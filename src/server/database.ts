import mongoose from "mongoose";
import User from "./db_models/db-user";
import Habit from "./db_models/db-habit";
import HabitOutcome from "./db_models/db-habit-outcome";
import UserHabit from "./db_models/db-user-habit";

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
        return await User.findOne({ username });
    }

    public async createUser(username: string, password: string) {
        const user = new User({ username, password, totalLoggedDays: 0 });
        await user.save();
    }




}