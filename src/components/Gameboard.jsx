import React from "react";

const GameBoard = ({ lettersArray }) => {
  return (
    <>
      <h1>GameBoard</h1>
      <div>
        {lettersArray.map((letter, index) => (
          <div key={index}>{letter}</div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
