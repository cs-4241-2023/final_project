import React, { useEffect, useState } from "react";
import GameBoard from "./components/gameboard";
import PuzzleMenu from "./components/Menu";
import Score from "./components/Score";
import GuessList from "./components/GuessList";
import Scoreboard from "./components/ScoreBoard";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
  let [lettersArray, setLettersArray] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ]);
  let [guessList, setGuessList] = useState([]);
  let [scores, setScores] = useState([
    { username: "randy", highScore: 20 },
    { username: "yuh", highScore: 69 },
  ]);

  //adds word to guess list
  const addGuessedWord = (word) => {
    setGuessList([...guessList, word]);
  };
  return (
    <>
      <PuzzleMenu></PuzzleMenu>
      <Score></Score>
      <GuessList guesses={guessList}></GuessList>
      <h1>Spelling Goat</h1>
      <GameBoard lettersArray={lettersArray} addGuessedWord={addGuessedWord} />
      <Scoreboard scores={scores}></Scoreboard>
    </>
  );
}

export default Home;
