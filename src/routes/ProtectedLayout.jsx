import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedLayout() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
