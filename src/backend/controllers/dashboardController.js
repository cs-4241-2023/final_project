import Group from "../models/Group.js";
import User from "../models/User.js"
import {request, response} from "express";
import {ObjectId} from "mongodb"; // Import your Mongoose Group model

export const getGroupList = async (request, response) => {
    try {
        const user = await User.findOne({username: request.session.user})

        let groupArr = [];

        for(let groupID of user.groups) {
            let group = await Group.findOne({_id: groupID});
            if(group) groupArr.push(group);
        }
        response.status(200).json(groupArr);
    } catch (error) {
        console.error("An error occurred while fetching groups:", error);
        response.status(500).end();
    }
};

export const addGroup = async (request, response) => {
    const {groupName, groupDescription, groupUsers } = request.body;

    try {
        // Create a new group using Mongoose model
        const newGroup = new Group({
            groupName,
            groupDescription,
            groupUsers,
            meetingTimes: "TBD",
        });

        let r = await newGroup.save();

        response.status(200).end(JSON.stringify({_id: r._id}));
    } catch (error) {
        console.error("An error occurred while adding a group:", error);
        response.status(500).end();
    }
};

// Delete a group controller
export const deleteGroup = async (request, response) => {
    const groupId = request.params.id;
    try {
        const deletedGroup = await Group.findByIdAndDelete(groupId);

        if (deletedGroup) {
            response.status(200).json({ message: 'Group deleted successfully' });
        } else {
            response.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        console.error("An error occurred while deleting a group:", error);
        response.status(500).end();
    }
};

export const lookupUser = async (request, response) => {
    let user = request.body.username;

    const foundUser = await User.findOne({username: user});

    if(foundUser) {
        response.status(200).end();
    } else {
        response.status(404).end();
    }
};

export const userGroupRef = async (request, response) => {
    let username = request.body.user;
    let groupRef = request.body.groupID;

    const user = await User.findOne({username: username});
    let userGroups = user.groups;
    userGroups.push(new ObjectId(groupRef));
    await user.updateOne({groups: userGroups})

    response.status(200).end();
}


export const getCurrentUser = (request, response) => {
    response.status(200).end(JSON.stringify({user: request.session.user}));
}