import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Register, { action as registerAction } from "./routes/Register";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Favorites from "./components/Favorites";
import Podcasts from "./components/Podcasts";
import ProtectedLayout from "./routes/ProtectedLayout";
import AuthLayout from "./routes/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
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
      },
      {
        path: "/profile",
        element: <ProtectedLayout />,
        children: [
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
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
