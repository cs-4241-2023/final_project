import "../../App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Paperclip from "./Paperclip";
import Schedule from "./Schedule";
import { useEffect, useState } from "react";
import Settings from "./Settings";

function App() {
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("New York");
  const [currentTime, setCurrentTime] = useState("");
  const [currentClass, setCurrentClass] = useState("main");
  const [schedule, setSchedule] = useState([ ]);
  const [settingsForm, setSettingsForm] = useState({
    firstName: "",
    lastName: "",
    location: "",
    emailLink: "",
    calendarLink: "",
    newsLink: "",
    bitcoinLink: "",
    stocksLink: "",
  });


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

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      setCurrentClass(
        currentHour >= 18 || currentHour < 6 ? "main-night" : "main"
      );
    };

    checkTime();
    const intervalId = setInterval(checkTime, 1000 * 60); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  const addSchedule = add => {
    const newSchedule = [...schedule, add];
    setSchedule(newSchedule);
  }

  return (
    <>
      <div className={currentClass}>
        {weather && <Header weather={weather} currentTime={currentTime} />}
        <Sidebar settingsForm={settingsForm}/>
        <Paperclip />
        <Schedule onAdd={addSchedule} ScheduleList={schedule} />
        <Settings setSettingsForm={setSettingsForm} settingsForm={settingsForm}/>
      </div>
    </>
  );
}

export default App;
