import { useState } from "react";

function Login(props) {
    const { setLoggedIn } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <>
            <h1>Login To Use RendezView</h1>
            { errorMessage === "" ? null : <p>{errorMessage}</p>}
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
        </>
    );

    function handleLogin(e) {
        e.preventDefault();

        console.log("Username:", username)
        console.log("Password:", password)

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
