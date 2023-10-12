export const updateAvailability = async (request, response) => {
    let availability = request.body;

    console.log(availability)

    response.status(200).end();
}