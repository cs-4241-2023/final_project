import { useState } from "react";

export default function Signup(props) {
    const { setSignUp, setErrorMessage, setHeaderMessage } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <form>
            <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" onClick={(e) => handleSignup(e)}>
                Sign up!
            </button>
        </form>
    );

    function handleSignup(e) {
        e.preventDefault();

        if (username === "") {
            setErrorMessage("Username cannot be empty")
            return;
        }
        else if (password === "") {
            setErrorMessage("Username cannot be empty")
        }
        // Check if the password is the same as the confirmed password
        else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.")
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
                setHeaderMessage("Login To RendezView")
            }
            else if (response.status === 401) {
                setErrorMessage("Username taken.")
            }
        });
        setErrorMessage("");
    }
}
