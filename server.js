import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
app.use(cors());

// MongoDB connection setup
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db = null;

async function connectToDB() {
  await client.connect();
  db = await client.db("Spelling_Goat_App");
  console.log("Connected to DB successfully");
}

connectToDB().catch((error) => {
  console.error("Error connecting to the database: ", error);
});

// middleware to check the connection to the database
app.use((req, res, next) => {
  if (db !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

// logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// parses JSON bodies
app.use(express.json());

// all other routes and middleware below
//test route
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

//test db route
app.get("/testdb", async (req, res) => {
  const test = await db.collection("scores").find().toArray();
  res.json(test);
});

const port = 3000;
ViteExpress.listen(app, port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
