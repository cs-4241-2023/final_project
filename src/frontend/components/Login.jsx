import { useState } from "react";

export default function Login(props) {
    const { setHeaderMessage, setSignUp, setErrorMessage, setLoggedIn } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <form className="login--form">
                <input
                    aria-label="input-username"
                    className="login--username interactable"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login--password interactable"
                    aria-label="password-input"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="login--submit interactable"
                    type={"submit"}
                    onClick={(e) => handleLogin(e)}
                >
                    Login
                </button>
                <button
                    type="button"
                    className="login--signup-button interactable"
                    onClick={() => {
                        setSignUp(true);
                        setHeaderMessage("Sign up for RendezView");
                        setErrorMessage("");
                    }}
                >
                    Don&rsquo;t have an account? Click Here!
                </button>
            </form>
        </>
    );

    function handleLogin(e) {
        e.preventDefault();

        if (username === "") {
            setErrorMessage("Username cannot be empty.");
            return;
        } else if (password === "") {
            setErrorMessage("Password cannot be empty.");
            return;
        }

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
