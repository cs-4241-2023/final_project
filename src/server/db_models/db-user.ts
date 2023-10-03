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

const User = mongoose.model('User', userSchema);
export default User;