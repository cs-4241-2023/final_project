import mongoose from "mongoose";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
export const defaultAvailability = days.reduce((availability, day) => {
    availability[day] = {};
    times.forEach(time => availability[day][time] = false)
    return availability
}, {})

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    users: {
        type: [String],
        default: [],
    },
    userAvailabilities: {
        type: Object,
        default: {}
    },
    meetingTimes: {
        type: String,
        default: "TBD",
    },
});

const Group = mongoose.model("Group", groupSchema, "Groups");
export default Group;


