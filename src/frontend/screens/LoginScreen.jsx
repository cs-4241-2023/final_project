import React, { useState, useEffect } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

function LoginScreen({ setLoggedIn }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("Login To RendezView");

    useEffect(() => {
        fetch("/auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((r) => {
            if (r.status === 200) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    return (
        <div className="login">
            <h1>{headerMessage}</h1>

            {!signUp ? (
                <Login
                    setSignUp={setSignUp}
                    setLoggedIn={setLoggedIn}
                    setErrorMessage={setErrorMessage}
                    setHeaderMessage={setHeaderMessage}
                />
            ) : (
                <Signup
                    setSignUp={setSignUp}
                    setErrorMessage={setErrorMessage}
                    setHeaderMessage={setHeaderMessage}
                />
            )}
            <div className="login--error-container">
                {errorMessage === "" ? null : <p>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default LoginScreen;
