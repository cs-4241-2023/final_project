import { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Score from "./components/Score";
import GuessList from "./components/GuessList";
import Scoreboard from "./components/ScoreBoard";
import { set } from "lodash";

function App() {
  const [lettersArray, setLettersArray] = useState([]);
  const [guessList, setGuessList] = useState([]);
  const [scores, setScores] = useState([
    { username: "randy", highScore: 20 },
    { username: "yuh", highScore: 69 },
  ]);
  const [puzzleNumber, setPuzzleNumber] = useState(1);
  //scores
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
//load puzzle on page load
  useEffect(() => {
    selectPuzzle(puzzleNumber);
}, []);
// load selected puzzle
const selectPuzzle = (puzzleNumber) => {
  fetch(`/puzzles/${puzzleNumber}`)
  .then((response) => response.text())
  .then((data) => data.toUpperCase())
  .then((data) => {
    setLettersArray(data)
    setGuessList([]);
    setPuzzleNumber(puzzleNumber);
    setCurrentScore(0);
  });
}

const checkGuess = (word) => {
  //check if word is in guessList
  if(guessList.includes(word)){
    alert("word already guessed")
    return
  }
  const postWord = { word: word };
  fetch(`/puzzles/${puzzleNumber}/submit-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postWord),
    })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("word is invalid")
      console.log("word is invalid")
    }
  })
  .then((wordScores) => {
    setGuessList([...guessList, word]);
    setCurrentScore( currentScore + wordScores.totalscore);
    console.log(wordScores.totalscore)
    // console.log(typeof(wordScores.totalscore))
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  return (
    <>
      <PuzzleMenu changePuzzle={selectPuzzle}></PuzzleMenu>
      <Score score={currentScore} highScore={highScore}></Score>
      <GuessList guesses={guessList}></GuessList>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} addGuessedWord={checkGuess}/>
      <Scoreboard scores={scores}></Scoreboard>
    </>
  );
}

export default App;