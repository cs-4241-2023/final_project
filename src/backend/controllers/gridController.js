import Group, {defaultAvailibility} from "../models/Group.js";
import User from "../models/User.js";

export const updateAvailability = async (request, response) => {
    let newAvailability = request.body.availability;
    let groupID = request.body.groupID;
    let username = request.body.user;

    let group = await Group.findOne({ _id: groupID });
    let currentAvailability = group.currentAvailibility;

    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
        ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
            '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].forEach(hour => {
                if(newAvailability[day][hour]) {
                    newAvailability[day][hour] = newAvailability[day][hour] || currentAvailability[day][hour];
                } else {
                    newAvailability[day][hour] = newAvailability[day][hour] && currentAvailability[day][hour];
                }
            });
    });
    await group.updateOne({currentAvailibility: newAvailability});

    let user = await User.findOne({username: username})
    let alreadySpecified = user.userAvailability;
    console.log(alreadySpecified)
    alreadySpecified.set(groupID, newAvailability)
    await user.updateOne({userAvailability:alreadySpecified});
    response.status(200).end();
}
