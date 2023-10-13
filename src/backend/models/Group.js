import mongoose from "mongoose";

export const defaultAvailibility = {
    Monday: {
        '8:00 AM': false,
        '9:00 AM': false,
        '10:00 AM': false,
        '11:00 AM': false,
        '12:00 PM': false,
        '1:00 PM': false,
        '2:000 PM': false,
        '3:00 PM': false,
        '4:00 PM': false,
        '5:00 PM': false,
        '6:00 PM': false,
        '7:00 PM': false,
        '8:00 PM': false
    },
    Tuesday: {
        '8:00 AM': false,
        '9:00 AM': false,
        '10:00 AM': false,
        '11:00 AM': false,
        '12:00 PM': false,
        '1:00 PM': false,
        '2:000 PM': false,
        '3:00 PM': false,
        '4:00 PM': false,
        '5:00 PM': false,
        '6:00 PM': false,
        '7:00 PM': false,
        '8:00 PM': false
    },
    Wednesday: {
        '8:00 AM': false,
        '9:00 AM': false,
        '10:00 AM': false,
        '11:00 AM': false,
        '12:00 PM': false,
        '1:00 PM': false,
        '2:000 PM': false,
        '3:00 PM': false,
        '4:00 PM': false,
        '5:00 PM': false,
        '6:00 PM': false,
        '7:00 PM': false,
        '8:00 PM': false
    },
    Thursday: {
        '8:00 AM': false,
        '9:00 AM': false,
        '10:00 AM': false,
        '11:00 AM': false,
        '12:00 PM': false,
        '1:00 PM': false,
        '2:000 PM': false,
        '3:00 PM': false,
        '4:00 PM': false,
        '5:00 PM': false,
        '6:00 PM': false,
        '7:00 PM': false,
        '8:00 PM': false
    },
    Friday: {
        '8:00 AM': false,
        '9:00 AM': false,
        '10:00 AM': false,
        '11:00 AM': false,
        '12:00 PM': false,
        '1:00 PM': false,
        '2:000 PM': false,
        '3:00 PM': false,
        '4:00 PM': false,
        '5:00 PM': false,
        '6:00 PM': false,
        '7:00 PM': false,
        '8:00 PM': false
    }
}

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    groupDescription: {
        type: String,
    },
    groupUsers: {
        type: [String],
        default: [],
    },
    currentAvailibility: {
        type: Object,
        default: defaultAvailibility
    },
    meetingTimes: {
        type: String,
    },
});

const Group = mongoose.model("Group", groupSchema, "Groups");
export default Group;


