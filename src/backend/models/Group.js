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
    meetingTimes: {
        type: String,
    },
});

const Group = mongoose.model("Group", groupSchema, "TestUserCollection");

export default Group;
