import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

function LoginScreen(props) {
    const { setLoggedIn } = props;

    const [errorMessage, setErrorMessage] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("Login To RendezView");

    React.useEffect(() => {
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
        <>
            <h1>{headerMessage}</h1>
            <div className="login--error-container">
                {errorMessage === "" ? null : <p>{errorMessage}</p>}
            </div>
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
        </>
    );
}

export default LoginScreen;
