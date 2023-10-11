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
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={settingsForm.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={settingsForm.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={settingsForm.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email Link:</label>
          <input
            type="text"
            name="emailLink"
            value={settingsForm.emailLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Calendar Link:</label>
          <input
            type="text"
            name="calendarLink"
            value={settingsForm.calendarLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>News Link:</label>
          <input
            type="text"
            name="newsLink"
            value={settingsForm.newsLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bitcoin Link:</label>
          <input
            type="text"
            name="bitcoinLink"
            value={settingsForm.bitcoinLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Stocks Link:</label>
          <input
            type="text"
            name="stocksLink"
            value={settingsForm.stocksLink}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Settings;