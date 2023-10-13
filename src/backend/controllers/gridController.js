import Group, { defaultAvailibility } from "../models/Group.js";
import User from "../models/User.js";

export const getUserAvailability = async (request, response) => {
    const userId = request.params.id;
    const user = await User.findOne({ _id: userId });
    const availability = user.availability;
    response.status(200).json(availability);
}

export const updateUserAvailability = async (request, response) => {
    const userId = request.params.id;
    const newAvailability = request.body.newAvailability;
    console.log("newAvailability", newAvailability)
    const user = await User.findOne({ _id: userId });
    await user.updateOne({ availability: newAvailability });
    response.status(200).end();
}

export const updateAvailability = async (request, response) => {
    let newAvailability = request.body.availability;
    let groupID = request.body.groupID;
    let username = request.body.user;

    let group = await Group.findOne({ _id: groupID });
    let currentAvailability = group.currentAvailibility;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

    days.forEach(day => {
        times.forEach(hour => {
                if (newAvailability[day][hour]) {
                    newAvailability[day][hour] = newAvailability[day][hour] || currentAvailability[day][hour];
                } else {
                    newAvailability[day][hour] = newAvailability[day][hour] && currentAvailability[day][hour];
                }
            });
    });
    await group.updateOne({ currentAvailibility: newAvailability });

    let user = await User.findOne({ username: username })
    let alreadySpecified = user.userAvailability;
    console.log("alreadySpecified", alreadySpecified)
    alreadySpecified.set(groupID, newAvailability)
    await user.updateOne({ userAvailability: alreadySpecified });
    response.status(200).end();
}
