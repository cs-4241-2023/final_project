import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

async function getPuzzle(puzzleID) {
  console.log(`Requested puzzle id: ${puzzleID}`);
  try {
    //const response = await fetch(`/puzzles/${puzzleID}`);
    const response = await fetch(`/puzzles/1`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getPuzzle(1)
