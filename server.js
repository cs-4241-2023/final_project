import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getConnection } from "./db/dbConnection.js";
import authRoute from "./routes/authRoutes.js";
import { calculateScore } from "./word-manager.js";
import puzzleRouter from "./routes/puzzles.js";
import { userVerificationWithNext } from "./auth/authMiddleware.js";

const app = express();
app.use(cors());

// connect to the database
let db = null;
(async () => {
  db = await getConnection();
})();

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

// cookie parser middleware
app.use(cookieParser());

// parses JSON bodies
app.use(express.json());

// authnetication routes
app.use("/", authRoute);
// for route protection

// all other routes and middleware below
//test route
app.get("/test", userVerificationWithNext, (req, res) => {
  res.send("Hello World!");
});

//test db route
app.get("/testdb", userVerificationWithNext, async (req, res) => {
  const test = await db.collection("scores").find().toArray();
  res.json(test);
});

// Puzzles route
app.use("/puzzles", userVerificationWithNext, puzzleRouter);

const port = 3000;
ViteExpress.listen(app, port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
