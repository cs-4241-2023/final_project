import Group from "../models/Group.js";
import {ObjectId} from "mongodb";

export const updateAvailability = async (request, response) => {
    let returnedAvailibility = {
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
    let newAvailability = request.body.availability;
    let groupID = request.body.groupID;
    let group = await Group.findOne({ _id: groupID });
    let currentAvailability = group.currentAvailibility;

['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
    ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:000 PM',
        '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].forEach(hour => {
                returnedAvailibility[day][hour] = newAvailability[day][hour] && currentAvailability[day][hour];
        });
});

    console.log(returnedAvailibility)

    response.status(200).end();
}
