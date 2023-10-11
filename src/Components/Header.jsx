import React, { useEffect, useState } from "react";
import "../../App.css";

function Header(props) {
  const [formattedDateWithSuffix, setFormattedDateWithSuffix] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = now.toLocaleDateString("en-US", options);

    const day = now.getDate();
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) {
      suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      suffix = "rd";
    }

    const formattedDateWithSuffixTemp = formattedDate.replace(
      `${day},`,
      `${day}${suffix},`
    );
    setFormattedDateWithSuffix(formattedDateWithSuffixTemp);
  }, []);

  return (
    <>
      <div className="header">
        <div className="greeting-card">
          <div className="greeting-text">Hello, User!</div>
          <div className="greeting-info">
            <p>{formattedDateWithSuffix}</p>
            <p>{props.currentTime}</p>
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
