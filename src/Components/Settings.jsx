import React, { useState } from "react";

function Settings(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    emailLink: "",
    calendarLink: "",
    newsLink: "",
    bitcoinLink: "",
    stocksLink: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  props.setSettingsForm(formData);
  document.querySelector(".settings-card").classList.toggle("hidden");    
  console.log(formData);
  };

  return (
    <div className="settings-card hidden">
      <h2 className="h2">Settings</h2>
      <form className="form">
      <div className="form-group">
          <label className="settings-label">First Name:</label>
          <input
            className="settings-input"
            type="text"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Last Name:</label>
          <input
          className="settings-input"
            type="text"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Location:</label>
          <input
          className="settings-input"
            type="text"
            name="location"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Email Link:</label>
          <input
          className="settings-input"
            type="text"
            name="emailLink"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Calendar Link:</label>
          <input
          className="settings-input"
            type="text"
            name="calendarLink"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">News Link:</label>
          <input
          className="settings-input"
            type="text"
            name="newsLink"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Bitcoin Link:</label>
          <input
          className="settings-input"
            type="text"
            name="bitcoinLink"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="settings-label">Stocks Link:</label>
          <input
          className="settings-input"
            type="text"
            name="stocksLink"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="settings-button">Save</button>
      </form>
    </div>
  );
}

export default Settings;
