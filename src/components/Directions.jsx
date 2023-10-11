import React, { useState } from 'react';

function InfoButton() {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const modalStyle = {
    display: showInstructions ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
  };

  const modalContentStyle = {
    backgroundColor: '#AC2B37',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '70%',
    maxWidth: '400px',
    position: 'relative',
  };

  const closeStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px',
    cursor: 'pointer',
  };

  const btnStyle = {
    backgroundColor: '#ac2b37',
    color: 'white',
    padding: '10px',
    margin: '10px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <>
      <button style={btnStyle} onClick={toggleInstructions}><h3>Directions</h3></button>
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <span style={closeStyle} onClick={toggleInstructions}>
            &times;
          </span>
          <h2>Instructions</h2>
          <p> 1.Every puzzle contains a unique set of letters. You must exclusively use the letters provided in the puzzle.</p>
          <p>2. You have the freedom to repeat any letter as many times as you like.</p>
          <p>3. You will earn extra points for guessing less common words.</p>
          <p>4. Utilizing all the letters in the puzzle will grant you bonus points.</p>
          <p>5. Only English words are considered valid in this game.</p>
          <p>6. Proper nouns are permissible for use.</p>
          <p>7. When you've finished, press the "Submit Score" button.</p>
        </div>
      </div>
    </>
  );
}

export default InfoButton;
