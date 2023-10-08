const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let usersCollection;

client.connect(err => {
    usersCollection = client.db("test").collection("users");
});

let allCollections = await client.db("test").listCollections().toArray()

router.get("/get-users", async (request, response) => {
    let result = await usersCollection.find({}).toArray()
    response.send(result)
})

router.post("/get-collection", async (request, response) => {
    let requestedCollection = null
    

    allCollections.forEach(collection => {
        if (collection.namespace === `RendezViewDatabase.${request.body.requestedCollection}`) {
            requestedCollection = collection
        }
    })

    if (requestedCollection !== null) {
        let data = await requestedCollection.find({}).toArray()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(data))
    } else {
        response.sendStatus(404)
    }
})

router.post("/add-group", async (request, response) => {

    let requestedCollection = null
    allCollections.forEach(collection => {
        if (collection.namespace === `RendezViewDatabase.${request.body.collection}`) {
            requestedCollection = collection
        }
    })

    await requestedCollection.insertOne({
        groupName: request.body.groupName,
        groupDescription: request.body.groupDescription,
        groupUsers: request.body.groupUsers,
        meetingTimes: "TBD"
    })

    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(JSON.stringify({}))
})

router.delete("/delete-group", (request, response) => {

    let requestedCollection = null
    allCollections.forEach(collection => {
        if (collection.namespace === `RendezViewDatabase.${request.body.collection}`) {
            requestedCollection = collection
        }
    })

    console.log("Delete Request for ID: " + request.body._id)

    requestedCollection.deleteOne({
        _id: new ObjectId(request.body._id)
    })
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(JSON.stringify({ result: "Success", message: "" }))
})

module.exports = router;