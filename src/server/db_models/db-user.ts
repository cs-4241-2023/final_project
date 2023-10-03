import mongoose, { Schema } from "mongoose";

// Schema for a DailyDive user
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
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
    totalLoggedDays: {
        type: Number,
        required: true,
    },
});

const DBUser = mongoose.model('DBUser', userSchema);
export default DBUser;