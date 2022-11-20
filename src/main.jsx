import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Register, { action as registerAction } from "./routes/Register";
import Login, { action as loginAction } from "./routes/Login";
import Profile from "./routes/Profile";
import Favorites from "./components/Favorites";
import Podcasts from "./components/Podcasts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
    children: [
      {
        path: "/profile/:username/favorites",
        element: <Favorites />,
      },
      {
        path: "/profile/:username/podcasts",
        element: <Podcasts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
