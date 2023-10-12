import React, { useState } from 'react';

const Score = ({score, highScore, submitScore, puzzleNumber, setHighScore }) => {

  // Function to update the high score when needed
  const updateHighScore = () => {
    if (score > highScore) {
      setHighScore(score);
      submitScore(puzzleNumber, score);
    }
  };

  // Inline styles for positioning and styling
  const scoreboardStyles = {
    position: 'absolute',
    top: '30px', // Adjust the top distance as needed
    right: '30px', // Adjust the right distance as needed
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
  };

  const scoreStyles = {
    marginBottom: '0px',
  };

  const btnStyle = {
    backgroundColor: '#ac2b37',
    color: 'white',
    padding: '10px',
    margin: '10px',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '110px', // Adjust the top distance as needed
    right: '30px', // Adjust the right distance as needed
  };

  return (
    <>
    <div style={scoreboardStyles}>
      <div style={scoreStyles}>
        <h3>Current Score: {score}</h3>
      </div>
      <div style={scoreStyles}>
        <h3>High Score: {highScore}</h3>
      </div>
    </div>
    <button onClick={()=> {
      updateHighScore();
    }} style={btnStyle}><h3>Submit Score</h3></button>
    </>
  );
};

export default Score;
