import React, { useEffect, useState } from "react";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Score from "./components/Score";
import GuessList from "./components/GuessList";
import Scoreboard from "./components/ScoreBoard";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

function App() {
  
}

function Home() {
  //auth stuff
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      //first check if cookie exists
      if (!cookies.token) {
        navigate("/login");
      }
      // then check if the cookies token is authorized
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": cookies.token,
        },
        credentials: "include",
      })
        .then((res) => {
          console.log("response", res);
          if (res.status === 200) {
            console.log("cookie authentication successful");
            return res.json();
          } else {
            console.log("cookie authentication failed");
            navigate("/login");
          }
        })
        .then((data) => {
          console.log("data", data);
          setUsername(data.user);
        })
        .catch((err) => {
          console.log("cookie authentication failed: ", err);
          navigate("/login");
        });
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  //actual page content below
  const [lettersArray, setLettersArray] = useState([]);
  const [guessList, setGuessList] = useState([]);
  const [scores, setScores] = useState([
    { username: "randy", highScore: 20 },
    { username: "yuh", highScore: 69 },
  ]);
  const [puzzleNumber, setPuzzleNumber] = useState(1);
  //scores
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
//load puzzle on page load
  useEffect(() => {
    selectPuzzle(puzzleNumber);
}, []);
// load selected puzzle
const selectPuzzle = (puzzleNumber) => {
  fetch(`/puzzles/${puzzleNumber}`)
  .then((response) => response.text())
  .then((data) => data.toUpperCase())
  .then((data) => {
    setLettersArray(data)
    setGuessList([]);
    setPuzzleNumber(puzzleNumber);
    setCurrentScore(0);
  });
}

const checkGuess = (word) => {
  //check if word is in guessList
  if(guessList.includes(word)){
    alert("word already guessed")
    return
  }
  const postWord = { word: word };
  fetch(`/puzzles/${puzzleNumber}/submit-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postWord),
    })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("word is invalid")
      console.log("word is invalid")
    }
  })
  .then((wordScores) => {
    setGuessList([...guessList, word]);
    setCurrentScore( currentScore + wordScores.totalscore);
    console.log(wordScores.totalscore)
    // console.log(typeof(wordScores.totalscore))
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
  return (
    <>
      <PuzzleMenu changePuzzle={selectPuzzle}></PuzzleMenu>
      <Score score={currentScore} highScore={highScore}></Score>
      <GuessList guesses={guessList}></GuessList>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} addGuessedWord={checkGuess}/>
      <Scoreboard scores={scores}></Scoreboard>
    </>
  );
}

export default Home;
