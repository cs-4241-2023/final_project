import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

async function getPuzzle(puzzleID) {
  console.log(`Requested puzzle id: ${puzzleID}`);
  try {
    const response = await fetch(`/puzzles/${puzzleID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
    puzzleWord = data;
  } catch (error) {
    console.error(error);
  }
}

async function submitWord(submittedWord, puzzleID) {
  const payload = { word: submittedWord };
  console.log(`Requested puzzle id: ${puzzleID}`);
  try {
    const response = await fetch(`/puzzles/${puzzleID}/submit-word`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function getPuzzleLeaderboard(puzzleID) {
  console.log(`Leaderboard requested for puzzle ${puzzleID}`);
  try {
    const response = await fetch(`/puzzles/${puzzleID}/leaderboard`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function submitScore(puzzleID, user, scoreToSubmit) {
  console.log(`Submitting score for puzzle ${puzzleID}`);
  const payload = { username: user,
                    score: scoreToSubmit,};
  console.log(`Requested puzzle id: ${puzzleID}`);
  try {
    const response = await fetch(`/puzzles/${puzzleID}/submit-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function getHighScoreForPuzzle(puzzleID) {
  console.log(`Requested puzzle id: ${puzzleID}`);
  try {
    const response = await fetch(`/puzzles/${puzzleID}/high-score`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

//getHighScoreForPuzzle(1)
