import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard"

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            {!loggedIn
                ?
                <LoginScreen setLoggedIn={setLoggedIn} />
                :
                <Dashboard setLoggedIn={setLoggedIn} />
            }
        </>
    );
}

export default App;
