import express from "express";
import ViteExpress from "vite-express";
import cookie from "cookie-session";
import env from "dotenv";
import mongoose from "mongoose";

import loginRoutes from "./routes/loginRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
env.config();
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`, {dbName: 'RendezViewDatabase'}
);

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("Connected to MongoDB:", mongoose.connection.db.databaseName);
});

app.use(express.json());
app.use(
    cookie({
        name: "session",
        keys: ["key1", "key2"],
    })
);

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use("/", loginRoutes);
app.use("/", dashboardRoutes);

ViteExpress.listen(app, parseInt(process.env.PORT));
