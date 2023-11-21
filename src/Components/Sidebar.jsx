import React from "react";
import { FaHome, FaEnvelope, FaCalendar, FaRobot, FaNewspaper, FaBitcoin, FaMoneyBillAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import Settings from "./Settings";

function Sidebar(props) {
  const handleHomeClick = () => {
    // Implement navigation to the home page
    // You can use React Router or window.location.href
  };

  const handleEmailClick = () => {
    window.open(props.settingsForm.emailLink, "_blank");
  };

  const handleCalendarClick = () => {
    window.open(props.settingsForm.calendarLink, "_blank");
  };

  const handleAIBotClick = () => {
    window.open("https://chat.openai.com", "_blank");
  };

  const handleNewsClick = () => {
    window.open(props.settingsForm.newsLink, "_blank");
  };

  const handleBitcoinClick = () => {
    window.open(props.settingsForm.bitcoinLink, "_blank");
  };

  const handleStocksClick = () => {
    window.open(props.settingsForm.stocksLink, "_blank");
  };

  const handleSettingsClick = () => {
    document.querySelector(".settings-card").classList.toggle("hidden");
  };

  return (
    <div className="sidebar">
      <div className="icon-space">
        <button onClick={handleHomeClick}>
          <FaHome /> Home
        </button>
        <button onClick={handleEmailClick}>
          <FaEnvelope /> Email
        </button>
        <button onClick={handleCalendarClick}>
          <FaCalendar /> Calendar
        </button>
        <button onClick={handleAIBotClick}>
          <FaRobot /> AI Bot
        </button>
        <button onClick={handleNewsClick}>
        <FaNewspaper /> News
        </button>
        <button onClick={handleBitcoinClick}>
          <FaBitcoin /> Bitcoin
        </button>
        <button onClick={handleStocksClick}>
          <FaMoneyBillAlt /> Stocks
        </button>
        </div>
      <div>
      <button onClick={handleSettingsClick}>
       <FaCog /> Settings 
      </button> 
      </div>
    </div>
  );
}

export default Sidebar;

