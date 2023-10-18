import "../../App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Paperclip from "./Paperclip";
import Schedule from "./Schedule";
import { useEffect, useState } from "react";
import Settings from "./Settings";

function App() {
  const [weather, setWeather] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [name, setName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentClass, setCurrentClass] = useState("main");
  const [event, setEvent] = useState({ subject: "", time: "" });
  const [settingsForm, setSettingsForm] = useState({
    firstName: "",
    lastName: "",
    location: "Boston",
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
    setName(`${settingsForm.firstName} ${settingsForm.lastName}`);

    settingsForm.location
      ? fetchWeather(settingsForm.location)
      : fetchWeather("Boston");
  }, [settingsForm]);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const amPm = now.getHours() >= 12 ? "PM" : "AM";
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
      setCurrentTime(currentTime);
    }

    updateClock();

    const intervalId = setInterval(updateClock, 1000);

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

  const getEvents = async () => {
    try {
      const response = await fetch("/getEvents");
      if (response.ok) {
        const events = await response.json();
        setSchedule(events);
        console.log(events);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [event]);

  return (
    <>
      <div className={currentClass}>
        {weather && (
          <Header weather={weather} currentTime={currentTime} name={name} />
        )}
        <Sidebar settingsForm={settingsForm} />
        <Paperclip />
        {schedule && <Schedule onAdd={setEvent} ScheduleList={schedule} />}
        <Settings
          setSettingsForm={setSettingsForm}
          settingsForm={settingsForm}
        />
      </div>
    </>
  );
}

export default App;
