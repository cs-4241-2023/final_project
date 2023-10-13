import mongoose from "mongoose";
import { defaultAvailability } from "./Group.js";

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
    availability: {
        type: Object,
        default: defaultAvailability
    }
});

const User = mongoose.model("User", userSchema, "Users");

export default User;
