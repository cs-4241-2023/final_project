import mongoose, { Schema } from "mongoose";

// Schema for a DailyDive user
const habitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;