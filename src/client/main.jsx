import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login.jsx";
import Homepage from "./homepage.jsx";
import UserPage from "./userpage.jsx"
import EventsPage from "./eventspage.jsx"
import "./css/theming.css";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/index", element: <Login /> },
  { path: "/homepage", element: <Homepage /> },
  { path: "/userpage", element: <UserPage /> },
  { path: "/eventspage", element: <EventsPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
