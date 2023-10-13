import mongoose from "mongoose";

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
        default: {
            Monday: {
                '8:00 AM': true,
                '9:00 AM': true,
                '10:00 AM': true,
                '11:00 AM': true,
                '12:00 PM': true,
                '1:00 PM': true,
                '2:000 PM': true,
                '3:00 PM': true,
                '4:00 PM': true,
                '5:00 PM': true,
                '6:00 PM': true,
                '7:00 PM': true,
                '8:00 PM': true
            },
            Tuesday: {
                '8:00 AM': true,
                '9:00 AM': true,
                '10:00 AM': true,
                '11:00 AM': true,
                '12:00 PM': true,
                '1:00 PM': true,
                '2:000 PM': true,
                '3:00 PM': true,
                '4:00 PM': true,
                '5:00 PM': true,
                '6:00 PM': true,
                '7:00 PM': true,
                '8:00 PM': true
            },
            Wednesday: {
                '8:00 AM': true,
                '9:00 AM': true,
                '10:00 AM': true,
                '11:00 AM': true,
                '12:00 PM': true,
                '1:00 PM': true,
                '2:000 PM': true,
                '3:00 PM': true,
                '4:00 PM': true,
                '5:00 PM': true,
                '6:00 PM': true,
                '7:00 PM': true,
                '8:00 PM': true
            },
            Thursday: {
                '8:00 AM': true,
                '9:00 AM': true,
                '10:00 AM': true,
                '11:00 AM': true,
                '12:00 PM': true,
                '1:00 PM': true,
                '2:000 PM': true,
                '3:00 PM': true,
                '4:00 PM': true,
                '5:00 PM': true,
                '6:00 PM': true,
                '7:00 PM': true,
                '8:00 PM': true
            },
            Friday: {
                '8:00 AM': true,
                '9:00 AM': true,
                '10:00 AM': true,
                '11:00 AM': true,
                '12:00 PM': true,
                '1:00 PM': true,
                '2:000 PM': true,
                '3:00 PM': true,
                '4:00 PM': true,
                '5:00 PM': true,
                '6:00 PM': true,
                '7:00 PM': true,
                '8:00 PM': true
            }
        }

    },
    meetingTimes: {
        type: String,
    },
});

const Group = mongoose.model("Group", groupSchema, "Groups");

export default Group;
