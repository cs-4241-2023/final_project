import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameboard";

function App() {
  //getPuzzle(1)
  // test()
  let [lettersArray, setLettersArray] = useState(["G", "O", "A", "T", "S"]);
  setTimeout(() => {
    setLettersArray(["G", "O", "A", "T", "S", "!", "!", "!"]);
  }, 2000);
  return (
    <>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} />
    </>
  );
}

/*
async function getPuzzle(puzzleID) {
  console.log(`Requested puzzle id: ${puzzleID}`)
  fetch(`http://127.0.0.1:5173/puzzles/${puzzleID}`)
  .then(response => response.text())
  .then(data => console.log(data))
}
*/

export default App;
