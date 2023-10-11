import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Score from "./components/Score";
import GuessList from "./components/GuessList";
import Scoreboard from "./components/ScoreBoard";
function App() {
  let [lettersArray, setLettersArray] = useState(["A", "B", "C", "D", "E","F", "G"]);
  let [guessList, setGuessList] = useState([])
  let [scores, setScores] = useState([{username: 'randy',highScore: 20}, {username: 'yuh', highScore: 69}])

  //adds word to guess list
  const addGuessedWord = (word) => {
    setGuessList([...guessList, word])
  }
  return (
    <>
    <PuzzleMenu></PuzzleMenu>
    <Score></Score>
      <GuessList guesses={guessList}></GuessList>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} addGuessedWord={addGuessedWord} />
      <Scoreboard scores={scores}></Scoreboard>
    </>
  );
}

export default App;
