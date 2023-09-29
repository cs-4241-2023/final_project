import "./App.css";

import { useState } from "react";

import reactLogo from "./assets/react.svg";
import TopBar from "./components/top-bar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <TopBar title="DailyDive"/>
    </div>
  );
}

export default App;
