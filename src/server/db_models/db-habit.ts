import mongoose, { Schema } from "mongoose";

// Schema for a DailyDive user
const habitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
});

const DBHabit = mongoose.model('DBHabit', habitSchema);
export default DBHabit;