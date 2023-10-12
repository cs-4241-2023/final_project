export const updateAvailability = async (request, response) => {
    let availability = request.body.availability;
    let groupID = request.body.groupID;

    response.status(200).end();
}