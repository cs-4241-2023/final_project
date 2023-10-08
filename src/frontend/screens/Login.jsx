import { useState } from "react";
import Signup from "./Signup";
import "../css/Login.css";

function Login(props) {
    const { setLoggedIn } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("Login To RendezView");
    return (
        <>
            <h1>{headerMessage}</h1>
            {errorMessage === "" ? null : <p>{errorMessage}</p>}
            {!signUp ? (
                <>
                    <form>
                        <input
                            aria-label={"input-username"}
                            type={"text"}
                            placeholder={"username"}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            aria-label={"password-input"}
                            type={"password"}
                            placeholder={"password"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type={"submit"} onClick={(e) => handleLogin(e)}>
                            Login
                        </button>
                    </form>
                    <button
                        type="button"
                        onClick={() => {
                            setSignUp(true);
                            setHeaderMessage("Sign up for RendezView")
                        }}
                    >
                        Don't have an account? Click Here!
                    </button>
                </>
            ) : (
                <Signup
                    setSignUp={setSignUp}
                    setErrorMessage={setErrorMessage}
                    setHeaderMessage={setHeaderMessage}
                />
            )}
        </>
    );

    function handleLogin(e) {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((response) => {
            if (response.status === 200) {
                setLoggedIn(true);
            } else if (response.status === 401) {
                setErrorMessage("Invalid password.");
            } else if (response.status === 404) {
                setErrorMessage("User not found.");
            }
        });
    }
}

export default Login;
