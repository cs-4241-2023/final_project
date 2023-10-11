import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { calculateScore } from "./word-manager.js";

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

app.get("/puzzles/:puzzleID", (req, res) => {
  const requestedID = req.params.puzzleID;
  console.log(`Client is requesting puzzle with ID of ${requestedID}`);
  const puzzle = puzzleList.find((t) => t.id === `${requestedID}`);
  if (puzzle === undefined) {
    res.status(404).send(
      `Puzzle with ID of ${requestedID} not found`
    );
  } else {
    const scrambledWord = scrambleWord(puzzle.word)
    res.send(scrambledWord); // Send the scrambled word as plain text
  }
});

const port = 3000;
ViteExpress.listen(app, port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/puzzles/:puzzleID/submit-word", (req, res) => {
  const requestedID = req.params.puzzleID
  const puzzle = puzzles.find(t=>t.id === `${requestedID}`)
  if (puzzle === undefined) {
    res.status(404).send(
      `Puzzle with ID of ${requestedID} not found`)
  }
  else {
  // TODO: make sure word has not already been submitted
    const data = req.body;
    const wordScore = calculateScore(data.word, puzzle.word)
    if (score !== undefined) {
      res.send({score: `${wordScore}`})
    } else {
      res.status(403).send('Submitted word is invalid')
    }
  }
})

function scrambleWord(puzzleWord) {
  // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
  const scrambledWord = puzzleWord.split('').sort(function(){return 0.5-Math.random()}).join('');
  return scrambledWord
}

const puzzleList = [
  {
      "id" : "1",
      "word" : "amplify"
  },
  {
      "id" : "2",
      "word" : "picture"
  },
  {
      "id" : "3",
      "word" : "caption"
  },
  {
      "id" : "4",
      "word" : "crowned"
  },
  {
      "id" : "5",
      "word" : "dialect"
  },
  {
      "id" : "6",
      "word" : "naively"
  },
  {
      "id" : "7",
      "word" : "network"
  },
  {
      "id" : "8",
      "word" : "healthy"
  },
  {
      "id" : "9",
      "word" : "journal"
  },
  {
      "id" : "10",
      "word" : "tangled"
  }
]
