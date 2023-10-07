import { useState } from "react";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard"

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    console.log("LOGGED IN:", loggedIn)
    
    return (
        !loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Dashboard setLoggedIn={setLoggedIn} /> 
    );
}

export default App;
