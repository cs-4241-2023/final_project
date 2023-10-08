import { ObjectId } from "mongodb";

// Retrieve dashboard data controller
export const getCollection = async (request, response) => {
    let requestedCollection = null;
    request.allCollections.forEach((collection) => {
        if (
            collection.namespace ===
            `RendezViewDatabase.${request.body.requestedCollection}`
        ) {
            requestedCollection = collection;
        }
    });

    if (requestedCollection !== null) {
        let data = await requestedCollection.find({}).toArray();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data));
    } else {
        response.sendStatus(404);
    }
};

// Add a new group controller
export const addGroup = async (request, response) => {
    let requestedCollection = null;
    request.allCollections.forEach((collection) => {
        if (
            collection.namespace ===
            `RendezViewDatabase.${request.body.collection}`
        ) {
            requestedCollection = collection;
        }
    });

    await requestedCollection.insertOne({
        groupName: request.body.groupName,
        groupDescription: request.body.groupDescription,
        groupUsers: request.body.groupUsers,
        meetingTimes: "TBD",
    });

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({}));
};

// Delete a group controller
export const deleteGroup = async (request, response) => {
    let requestedCollection = null;
    request.allCollections.forEach((collection) => {
        if (
            collection.namespace ===
            `RendezViewDatabase.${request.body.collection}`
        ) {
            requestedCollection = collection;
        }
    });

    console.log("Delete Request for ID: " + request.body._id);

    requestedCollection.deleteOne({
        _id: new ObjectId(request.body._id),
    });
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ result: "Success", message: "" }));
};
