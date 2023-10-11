import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard"

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="container">
            {!loggedIn ? <LoginScreen setLoggedIn={setLoggedIn} /> : <Dashboard setLoggedIn={setLoggedIn} />}
        </div>
    );
}

export default App;
