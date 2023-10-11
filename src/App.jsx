import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Scoreboard from "./components/Score";
import InfoButton from "./components/Directions";
function App() {
  let [lettersArray, setLettersArray] = useState(["A", "B", "C", "D", "E","F", "G"]);
  return (
    <>
    <PuzzleMenu></PuzzleMenu>
    <Scoreboard></Scoreboard>
      <h1>Spelling Goat</h1>

      <GameBoard lettersArray={lettersArray} />
    
    </>
  );
}

export default App;
