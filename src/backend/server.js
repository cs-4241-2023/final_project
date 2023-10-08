import express, { response } from "express"
import ViteExpress from "vite-express"
import { MongoClient, ObjectId } from "mongodb"
import cookie from "cookie-session"
import env from "dotenv"

import loginRoutes from './routes/loginRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express()
env.config()

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`
const dbClient = new MongoClient(url)
let currCollection = null

let usersCollection = null
let allCollections = null;

// Connect to MongoDB
(async () => {
    try {
        await dbClient.connect()
        usersCollection = await dbClient.db("RendezViewDatabase").collection("Users")
        allCollections = await dbClient.db("RendezViewDatabase").collections()
        if (usersCollection !== null && allCollections !== null) {
            console.log("Connected to database")
        } else {
            console.error("Unable to connect to database")
        }
    } catch (e) {
        console.error("An error occurred while connecting to the database:", e)
    }
})()

app.use((request, response, next) => {
    if (usersCollection !== null) {
        next()
    } else {
        response.sendStatus(503) // send 503 on database disconnect
    }
})

app.use(express.json())

app.use(cookie({
    name: "session",
    keys: ["key1", "key2"]
}))

app.use('/', loginRoutes);
app.use('/', dashboardRoutes);

ViteExpress.listen(app, parseInt(process.env.PORT))