import React from "react";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Scoreboard from "./components/Score";
import InfoButton from "./components/Directions";

function Home({ lettersArray }) {
  return (
    <>
      <PuzzleMenu></PuzzleMenu>
      <Scoreboard></Scoreboard>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} />
    </>
  );
}

export default Home;
