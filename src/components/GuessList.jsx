import React from 'react';

const GuessList = ({ guesses }) => {

  const guessListStyle = {
    position: 'absolute',
    top: 200,
    right: 30,
  }

  const tableStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  const thStyle = {
    borderBottom: '2px solid #333',
    paddingInline: '40px'
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  return (
    <div style={guessListStyle}>
      <table style={tableStyle}>
        <thead >
          <tr>
            <th style={thStyle}>Guesses</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr key={index}>
              <td>{guess}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuessList;
