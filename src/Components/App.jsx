import "../../App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ToDo from "./ToDo";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [toDo, setToDo] = useState([ ]);

  const fetchWeather = async search => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=d1bfed572118495ea1d193651231407&q=${search}`,
        { mode: "cors" }
      );

      const weatherData = await response.json();
      setWeather(weatherData);
      console.log(weatherData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchWeather(search);
  }, [search]);

  const addToDo = async (add) => {
    setToDo(toDo.push(add));
  }

  return (
    <>
      <div className="main">
        {weather && <Header weather={weather} />}
        <Sidebar />
        <ToDo title="TITLE" description="DESCRIPTION"/>
      </div>
    </>
  );
}

export default App;
