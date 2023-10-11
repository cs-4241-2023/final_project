import "../../App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Paperclip from "./Paperclip";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const fetchWeather = async (search) => {
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

  useEffect(() => {
    // Function to update the current time
    function updateClock() {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const amPm = now.getHours() >= 12 ? "PM" : "AM";
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
      setCurrentTime(currentTime);
    }

    // Update the clock initially
    updateClock();

    // Set an interval to update the clock every second
    const intervalId = setInterval(updateClock, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {" "}
      <div>
    
          <div className="main">
            {weather && <Header weather={weather} currentTime={currentTime} />}
            <Sidebar />
            <Paperclip />
          </div>
        
      </div>
    </>
  );
}

export default App;
