import React, { useState } from "react";
import Login from "./pages/login.jsx";
import Cal from "./pages/calendar.jsx"; 


import "./styles/styles.css";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    if (!isLoggedIn) {
        return <Login onLoginSuccess={(username) => { 
            setIsLoggedIn(true);
            setCurrentUser(username);
        }} />;
    }
    return (
        <>
            <Cal currentUser={currentUser} />;
        </>
    );
}