import express from "express"
import {MongoClient, ObjectId} from "mongodb"
import cookie from "cookie-session"
import env from "dotenv"

const app = express();

const url =
    "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_HOST;

const dbClient = new MongoClient(url);
let collection = null;
let dbname = "";
let collectionName = ""

const initDatabase = async () => {
    await dbClient.connect();
    collection = await dbClient.db(dbname).collection(collectionName);
}
initDatabase().then(() => console.log("Connecting to database..."));



