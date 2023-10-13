import Group, {defaultAvailibility} from "../models/Group.js";

export const updateAvailability = async (request, response) => {
    let newAvailability = request.body.availability;
    let groupID = request.body.groupID;

    let group = await Group.findOne({ _id: groupID });
    let currentAvailability = group.currentAvailibility;
    let returnedAvailibility = defaultAvailibility;

    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
        ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:000 PM',
            '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].forEach(hour => {
                    returnedAvailibility[day][hour] = newAvailability[day][hour] || currentAvailability[day][hour];
            });
    });
    console.log(returnedAvailibility)
    await group.updateOne({currentAvailibility: returnedAvailibility});
    response.status(200).end();
}
