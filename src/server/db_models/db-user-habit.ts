import mongoose, { Schema } from "mongoose";
import User from "./db-user";

// Schema for a DailyDive user
const userHabitSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'DBUser',
        required: true,
    },
    habitID: {
        type: Schema.Types.ObjectId,
        ref: 'DBHabit',
        required: true,
    },
    totalSuccesses: {
        type: Number,
        required: true,
    },
    totalFails: {
        type: Number,
        required: true,
    },
    numLoggedDays: {
        type: Number,
        required: true,
    },

});

const DBUserHabit = mongoose.model('DBUserHabit', userHabitSchema);
export default DBUserHabit;