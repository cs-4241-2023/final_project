import React, { useState } from 'react';
import InfoButton from './Directions';

const PuzzleMenu = ({changePuzzle}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);

  const puzzles = [
    'Puzzle 1',
    'Puzzle 2',
    'Puzzle 3',
    'Puzzle 4',
    'Puzzle 5',
    'Puzzle 6',
    'Puzzle 7',
    'Puzzle 8',
    'Puzzle 9',
    'Puzzle 10',
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dropdownStyle = {
    position: 'fixed', // Fixed position to stay in place
    top: '20px', // Adjust the top value as needed
    left: '20px', // Adjust the right value as needed
  };

  const dropbtnStyle = {
    backgroundColor: '#ac2b37',
    color: 'white',
    padding: '10px',
    margin: '10px',
    border: 'none',
    cursor: 'pointer',
  };

  const dropdownContentStyle = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    cursor: 'pointer',
  };

  const linkStyle = {
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    color: '#333',
  };

  const linkHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  return (
    <div style={dropdownStyle}>
      <div style={dropdownStyle}>
        <button style={dropbtnStyle} onClick={toggleDropdown}>
          <h3>Select a Puzzle</h3>
        </button>
        <div style={dropdownContentStyle}>
          {puzzles.map((puzzle, index) => (
            <a
              key={index}
              style={linkStyle}
              onClick={() => changePuzzle(index + 1)}
            >
              {puzzle}
            </a>
          ))}
        </div>
      
      <InfoButton></InfoButton>
      </div>
    </div>
  );
};

export default PuzzleMenu;
