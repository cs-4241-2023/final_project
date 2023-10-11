import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { calculateScore } from "./word-manager.js";
import puzzleRouter from "./routes/puzzles.js";

const app = express();

app.use(cors());

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

// Puzzles route
app.use('/puzzles', puzzleRouter)

const port = 3000;
ViteExpress.listen(app, port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});