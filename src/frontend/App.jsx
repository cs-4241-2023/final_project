import { useState } from "react";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard"
import "./css/styles.css"

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    console.log("LOGGED IN:", loggedIn)

    return (
        <div className="container">
            {!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Dashboard setLoggedIn={setLoggedIn} />}
        </div>
    );
}

export default App;
