import React from "react";
import { Form } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Logout({ username }) {
  const { logout } = useAuth();
  return (
    <div>
      <Form onSubmit={logout}>
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
