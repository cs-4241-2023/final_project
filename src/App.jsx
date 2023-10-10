import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameboard";


function App() {
  let [lettersArray, setLettersArray] = useState(["A", "B", "C", "D", "E","F", "G"]);
  return (
    <>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} />
    
    </>
  );
}

export default App;
