import express from "express";
import ViteExpress from "vite-express";
import cookie from "cookie-session";
import env from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

import loginRoutes from "./routes/loginRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
env.config();

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
const dbClient = new MongoClient(url);
let usersCollection = null;
let allCollections = null;

// Middleware for JSON parsing and session handling
app.use(express.json());
app.use(
    cookie({
        name: "session",
        keys: ["key1", "key2"],
    })
);

// Database initialization middleware
app.use(async (req, res, next) => {
    try {
        await dbClient.connect();
        usersCollection = await dbClient.db("RendezViewDatabase").collection("Users");
        allCollections = await dbClient.db("RendezViewDatabase").collections();
        if (usersCollection !== null && allCollections !== null) {
            console.log("Connected to database");
            req.db = dbClient.db("RendezViewDatabase"); // Attach the database instance to req
            req.allCollections = allCollections;
            next();
        } else {
            console.error("Unable to connect to database");
            res.sendStatus(503); // Service unavailable on database disconnect
        }
    } catch (error) {
        console.error("An error occurred while connecting to the database:", error);
        res.sendStatus(503); // Service unavailable on database error
    }
});

app.use("/", loginRoutes);
app.use("/", dashboardRoutes);

ViteExpress.listen(app, parseInt(process.env.PORT));
