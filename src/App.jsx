import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameboard";

function App() {
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

export default App;
