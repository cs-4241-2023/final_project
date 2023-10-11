import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth-frontend/Login";
import Signup from "./auth-frontend/Signup";
import "./App.css";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Scoreboard from "./components/Score";
import InfoButton from "./components/Directions";
function App() {
  let [lettersArray, setLettersArray] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <>
              <PuzzleMenu></PuzzleMenu>
              <Scoreboard></Scoreboard>
              <h1>Spelling Goat</h1>

              <GameBoard lettersArray={lettersArray} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
