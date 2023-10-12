import mongoose, { Schema } from "mongoose";

// Schema for a DailyDive user
const habitOutcomeSchema = new Schema({
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
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    isSuccess: {
        type: Boolean,
        required: true,
    },

});

const DBHabitOutcome = mongoose.model('DBHabitOutcome', habitOutcomeSchema);
export default DBHabitOutcome;