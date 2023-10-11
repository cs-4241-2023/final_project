import express from "express";
import { calculateScore } from "../word-manager.js";
import { getConnection } from "../db/dbConnection.js";
const puzzleRouter = express.Router();

puzzleRouter.get("/:puzzleID", (req, res) => {
    const requestedID = req.params.puzzleID;
    console.log(`Client is requesting puzzle with ID of ${requestedID}`);
    const puzzle = puzzleList.find((t) => t.id === `${requestedID}`);
    if (puzzle === undefined) {
      res.status(404).send(
        `Puzzle with ID of ${requestedID} not found`
      );
    } else {
      const scrambledWord = scrambleWord(puzzle.word)
      console.log(`Scrambled word: ${scrambledWord}`)
      res.send(scrambledWord); // Send the scrambled word as plain text
    }
  });
  
  puzzleRouter.post("/:puzzleID/submit-word", async (req, res) => {
    const requestedID = req.params.puzzleID
    const puzzle = puzzleList.find(t=>t.id === `${requestedID}`)
    if (puzzle === undefined) {
      res.status(404).send(
        `Puzzle with ID of ${requestedID} not found`)
    }
    else {
    // TODO: make sure word has not already been submitted
      const wordScores = await calculateScore(req.body.word, puzzle.word)
      if (wordScores !== null) {
        console.log("Word score: " + wordScores.totalscore)
        // res.status(200).send(wordScores)
        res.send(wordScores)
      } else {
        res.status(403).send('Submitted word is invalid')
      }
    }
  })

  puzzleRouter.get("/:puzzleID/leaderboard", async (req, res) => {
    const requestedID = req.params.puzzleID
    const puzzle = puzzleList.find(t=>t.id === `${requestedID}`)
    if (puzzle === undefined) {
      res.status(404).send(
        `Puzzle with ID of ${requestedID} not found`)
    } else {
        console.log(`Client requesting leaderboard data for puzzle ${requestedID}`);

        const db = await getConnection();
        const pipeline = [
            { $match: { puzzle: requestedID } },
            { $group: { _id: "$username", highScore: { $max: "$score" } } }
          ];
          
        const scores = await db.collection("scores").aggregate(pipeline).toArray();

        if (scores.length > 0) {
        console.log("Scores for puzzle:", scores);
        } else {
        console.log("No scores found for the requested puzzle.");
        }
        res.send(scores)
    }
  })

  puzzleRouter.post("/:puzzleID/submit-score", async (req, res) => {
    const requestedID = req.params.puzzleID
    const puzzle = puzzleList.find(t=>t.id === `${requestedID}`)
    if (puzzle === undefined) {
      res.status(404).send(
        `Puzzle with ID of ${requestedID} not found`)
    } else {
        const payload = req.body
        if (payload !== undefined && payload.username !== undefined && payload.score !== undefined) {
            const db = await getConnection();
            const doc = {
                username: payload.username,
                score: payload.score,
                puzzle: requestedID
            }
            const result = await db.collection("scores").insertOne(doc)
            if (!result.insertedId) {
                return res.status(500).json({ message: "Failed to submit score" });
            } else {
                return res.status(201).json({ message: "Score submitted successfully" });
            }
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

  export default puzzleRouter