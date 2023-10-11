import React from "react";
import { FaHome, FaEnvelope, FaCalendar, FaRobot, FaNewspaper, FaBitcoin, FaMoneyBillAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import Settings from "./Settings";

function Sidebar({ userSettings, updateUserSettings }) {
  const handleHomeClick = () => {
    // Implement navigation to the home page
    // You can use React Router or window.location.href
  };

  const handleEmailClick = () => {
    window.location.href = userSettings.emailLink;
  };

  const handleCalendarClick = () => {
    window.location.href = userSettings.calendarLink;
  };

  const handleAIBotClick = () => {
    window.location.href = "https://chat.openai.com";
  };

  const handleNewsClick = () => {
    window.location.href = userSettings.newsLink;
  };

  const handleBitcoinClick = () => {
    // Handle Bitcoin button click
    // Redirect to Bitcoin-related page or action
  };

  const handleStocksClick = () => {
    // Handle Stocks button click
    // Redirect to Stocks-related page or action
  };

  return (
    <div className="sidebar">
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
      <button>
        <FaCog /> <Link to="/settings">Settings</Link>
      </button>
    </div>
  );
}

export default Sidebar;