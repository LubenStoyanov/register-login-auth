import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
