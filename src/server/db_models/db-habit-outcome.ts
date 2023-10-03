import mongoose, { Schema } from "mongoose";

// Schema for a DailyDive user
const habitOutcomeSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    habitID: {
        type: Schema.Types.ObjectId,
        ref: 'Habit',
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

const HabitOutcome = mongoose.model('HabitOutcome', habitOutcomeSchema);
export default HabitOutcome;