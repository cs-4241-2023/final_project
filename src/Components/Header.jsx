import { useEffect, useState } from "react";
import "../../App.css";

function Header(props) {
  return (
    <>
      <div className="header">
        <div className="greeting-card">
          <div className="greeting-text">Hello, User!</div>
          <div className="greeting-info">
            {"time"} | {"date"}
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
