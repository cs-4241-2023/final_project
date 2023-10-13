import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }   
    ],
    userAvailability: {
        type: mongoose.Schema.Types.Map,
        default: new Map()
    }
});

const User = mongoose.model("User", userSchema, "Users");

export default User;
