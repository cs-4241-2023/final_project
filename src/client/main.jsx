import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login.jsx";
import Hours from "./views/hours.jsx";
import HomePage from "./views/homepage.jsx";
import AttendancePage from "./views/attendance.jsx";
import Layout from "./Layout.jsx";
import "./css/theming.css";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/hours" element={<Hours />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
        <Route path="/attendance" element={<AttendancePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
