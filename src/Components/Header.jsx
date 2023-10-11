import { useEffect, useState } from "react";
import "../../App.css";

function Header(props) {
  function getCurrentDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  const currentDate = getCurrentDate();

  return (
    <>
      <div className="header">
        <div className="greeting-card">
          <div className="greeting-text">Hello, User!</div>
          <div className="greeting-info">
            {props.currentTime} | {currentDate}
          </div>
        </div>
        <div className="weather-card">
          <div className="weather-info">
            <div className="degrees">{props.weather.current.temp_f}°F</div>
            <div className="weather-description">
              {props.weather.current.condition.text}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
