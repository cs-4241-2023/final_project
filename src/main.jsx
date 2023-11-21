import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import Settings from "./Components/Settings.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "/Settings", element: <Settings/> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
