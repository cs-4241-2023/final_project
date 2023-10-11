import { useState } from "react";

export default function Signup(props) {
    const { setSignUp, setErrorMessage, setHeaderMessage } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <form className="signup--form">
            <input
                type="text"
                className="signup--username interactable"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="signup--password interactable"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                className="signup--password interactable"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                type="submit"
                className="signup--submit interactable"
                onClick={(e) => handleSignup(e)}
            >
                Sign up!
            </button>
        </form>
    );

    function handleSignup(e) {
        e.preventDefault();

        if (username === "") {
            setErrorMessage("Username cannot be empty.");
            return;
        } else if (password === "") {
            setErrorMessage("Password cannot be empty.");
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((response) => {
            if (response.status === 200) {
                setSignUp(false);
                setHeaderMessage("Login To RendezView");
            } else if (response.status === 409) {
                setErrorMessage("Username taken.");
            }
        });
        setErrorMessage("");
    }
}
