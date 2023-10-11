import React, { useState } from "react";

function Settings(props) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsForm({ ...settingsForm, [name]: value });
  };

  const handleSubmit = () => {
    // Update user settings with the new values from settingsForm
    updateUserSettings(settingsForm);
    window.location.href = "/";
  };

  return (
    <div className="settings-card hidden">
      <h2 className="h2">Settings</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="settings-label">First Name:</label>
          <input
            className="settings-input"
            type="text"
            name="firstName"
            value={settingsForm.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Last Name:</label>
          <input
          className="settings-input"
            type="text"
            name="lastName"
            value={settingsForm.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Location:</label>
          <input
          className="settings-input"
            type="text"
            name="location"
            value={settingsForm.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Email Link:</label>
          <input
          className="settings-input"
            type="text"
            name="emailLink"
            value={settingsForm.emailLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Calendar Link:</label>
          <input
          className="settings-input"
            type="text"
            name="calendarLink"
            value={settingsForm.calendarLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">News Link:</label>
          <input
          className="settings-input"
            type="text"
            name="newsLink"
            value={settingsForm.newsLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Bitcoin Link:</label>
          <input
          className="settings-input"
            type="text"
            name="bitcoinLink"
            value={settingsForm.bitcoinLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Stocks Link:</label>
          <input
          className="settings-input"
            type="text"
            name="stocksLink"
            value={settingsForm.stocksLink}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="settings-button">Save</button>
      </form>
    </div>
  );
}

export default Settings;
