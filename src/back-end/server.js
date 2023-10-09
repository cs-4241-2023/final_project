import express, { response } from "express";
import ViteExpress from "vite-express";
import { MongoClient, ObjectId } from "mongodb";
import cookie from "cookie-session";
import env from "dotenv";
const app = express();
env.config();

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
const dbClient = new MongoClient(url);
let db = null;
let currCollection = null;

let usersCollection = null;
let allCollections = null;

const initDatabase = async () => {
    await dbClient.connect();
    db = await dbClient.db("RendezViewDatabase")
    usersCollection = await db
        .collection("Users");
    allCollections = await dbClient.db("RendezViewDatabase").collections();
    if (usersCollection !== null && allCollections !== null) {
        return 0;
    } else {
        return -1;
    }
};

initDatabase().then((result) => {
    if (result === 0) {
        console.log("Connected to database");
    } else {
        console.error("Unable to connect to database");
    }
});

app.use((request, response, next) => {
    if (usersCollection !== null) {
        next();
    } else {
        response.sendStatus(503); // send 503 on database disconnect
    }
});

app.use(express.json());
app.use(
    cookie({
        name: "session",
        keys: ["key1", "key2"],
    })
);

app.post("/login", async (req, res) => {
    // Find user within MongoDB
    const response = await usersCollection.findOne({
        username: req.body.username,
    });

    if (response !== null) {
        if (response.password === req.body.password) {
            // TODO: figure out the cookie because brandon is stupid
            req.session.user = req.body.username;
            console.log("login success");
            res.status(200);
            res.end();
        } else {
            console.log("incorrect password");
            res.status(401);
            res.end();
        }
    } else {
        console.log("user not found");
        res.status(404);
        res.end();
    }
});

app.post("/signup", async (req, res) => {
    const response = await usersCollection.findOne({
        username: req.body.username,
    });

    // If the username is not already taken, add the user into the 'User' collection and create a new collection for the user
    if (response === null) {
        // Insert a new document into the 'Users' collection
        usersCollection.insertOne({
            username: req.body.username,
            password: req.body.password,
            groups: {}
        });

        res.status(200);
        res.end();
    } else {
        res.status(401);
        res.end();
    }
});

app.get("/get-users", async (request, response) => {
    let result = await usersCollection.find({}).toArray();
    response.send(result);
});

app.post("/get-collection", async (request, response) => {
    let requestedCollection = null;
    allCollections.forEach((collection) => {
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
});

app.post("/add-group", async (request, response) => {
    let requestedCollection = null;
    allCollections.forEach((collection) => {
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
});

app.delete("/delete-group", (request, response) => {
    let requestedCollection = null;
    allCollections.forEach((collection) => {
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
});

ViteExpress.listen(app, parseInt(process.env.PORT));
