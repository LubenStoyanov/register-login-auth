import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { action as registerAction } from "./App";
import "./index.css";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    action: registerAction,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
