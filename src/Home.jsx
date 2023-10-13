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
import { get, set } from "lodash";

function Home() {
  //function declarations
  async function getPuzzleLeaderboard(puzzleID) {
    console.log(`Leaderboard requested for puzzle ${puzzleID}`);
    try {
      const response = await fetch(`/puzzles/${puzzleID}/leaderboard`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function submitScore(puzzleID, scoreToSubmit) {
    console.log(`Submitting score for puzzle ${puzzleID}`);
    const payload = {score: scoreToSubmit};
      console.log(`Requested puzzle id: ${puzzleID}`);
      try {
        const response = await fetch(`/puzzles/${puzzleID}/submit-score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             "x-access-token": cookies.token,
          },
          body: JSON.stringify(payload),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        console.log(data);
        getPuzzleLeaderboard(puzzleID).then((res) => {setScores(res)}).catch((err) => {console.error(err);});
      } catch (error) {
        console.error(error);
      }
    }

  //auth stuff
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

   // logout function
    const logout = () => {
      removeCookie("token");
      navigate("/login");
    };

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
          // console.log("data", data);
          setUsername(data.user);
          // show welcome message
          setShowWelcome(true);
          // toggle it back to false after 3 seconds
          setTimeout(() => {
            setShowWelcome(false);
          }, 3000);
        })
        .catch((err) => {
          console.log("cookie authentication failed: ", err);
          navigate("/login");
        });
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

const getHighScoreForPuzzle = async () => {
  fetch(`puzzles/${puzzleNumber}/high-score`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "x-access-token": cookies.token,
    },
    credentials: 'include',
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if(res.status === 404) {
      console.log("no high exists for the user");
      return res.json();
    }
  }
  ).then((res) => {
    res.score ? setHighScore(res.score) : setHighScore(0);
  })
  .catch(err => {
    console.log(err);
  })
} 

  //actual page content below
  const [lettersArray, setLettersArray] = useState([]);
  const [guessList, setGuessList] = useState([]);
  const [scores, setScores] = useState([]);
  const [puzzleNumber, setPuzzleNumber] = useState(1);
  //scores
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
//load puzzle on page load
useEffect(() => {
  selectPuzzle(puzzleNumber);
  getPuzzleLeaderboard(puzzleNumber)
  .then((res) => setScores(res));
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

useEffect(() => {
  getHighScoreForPuzzle();
}, [puzzleNumber])

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
      // console.log("response.json: ", response.json())
      return response.json();
    } else {
      alert("word is invalid")
      return Promise.reject("Word is invalid");
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
      <button onClick={logout} style={{backgroundColor: '#ac2b37',
        color: 'white',
        padding: '10px',
        margin: '10px',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '20px', 
        left: '330px',
        }}><h3>Logout</h3></button>
      <PuzzleMenu 
        setPuzzleNumber={setPuzzleNumber} 
        changePuzzle={selectPuzzle} 
        getPuzzleLeaderboard={getPuzzleLeaderboard}
        setScores={setScores}
        getHighScoreForPuzzle={getHighScoreForPuzzle}
        setHighScore={setHighScore}>
      </PuzzleMenu>
      <Score 
        score={currentScore} 
        highScore={highScore}
        setHighScore={setHighScore}
        submitScore={submitScore}
        puzzleNumber={puzzleNumber}
        getHighScoreForPuzzle={getHighScoreForPuzzle}>
      </Score>
      <GuessList guesses={guessList}></GuessList>
      <h1>Spelling Goat</h1>
      {showWelcome ? <h3>Welcome, {username}</h3> : null}
      <GameBoard lettersArray={lettersArray} addGuessedWord={checkGuess}/>
      <Scoreboard scores={scores}></Scoreboard>
    </>
  );
}

export default Home;
