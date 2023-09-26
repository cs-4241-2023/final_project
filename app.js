import express, {request, response} from "express"
import {MongoClient, ObjectId} from "mongodb"
import cookie from "cookie-session"
import "dotenv"

const app = express();

const url =
    "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_HOST;

const dbClient = new MongoClient(url);

// TODO: Add more connections as need
let collection = null;

// TODO: Add more db names and collection names as needed
let dbname = "";
let collectionName = ""

const initDatabase = async () => {
    await dbClient.connect();
    collection = await dbClient.db(dbname).collection(collectionName);
    if(collection !== null) {
        return 0;
    } else {
        return -1;
    }
}
initDatabase().then((result) => {
    if(result === 0) {
        console.log("Connected to database");
    } else {
        console.error("Unable to connect to database")
    }
});

app.use((request, response, next)  => {
    if(collection !== null) {
        next();
    } else {
        response.sendStatus(503); // send 503 on database disconnect
    }
});

app.use(express.json());
app.use(cookie({
    name: "session",
    keys: ["key1", "key2"]
}));



