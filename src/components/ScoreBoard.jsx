import React from 'react';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const headerCellStyle = {
  border: '1px solid #000',
  // backgroundColor: '#f2f2f2',
  padding: '8px',
  textAlign: 'left',
};

const cellStyle = {
  border: '1px solid #000',
  padding: '8px',
  textAlign: 'left',
};

const Scoreboard = ({ scores }) => {
  //sort by highest score
  scores.sort((a, b) => b.highScore - a.highScore);

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>Username</th>
          <th style={headerCellStyle}>High Score</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={index}>
            <td style={cellStyle}>{score._id}</td>
            <td style={cellStyle}>{score.highScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Scoreboard;
