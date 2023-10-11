import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth-frontend/Login";
import Signup from "./auth-frontend/Signup";
import "./App.css";
import Home from "./Home";
function App() {
  let [lettersArray, setLettersArray] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
