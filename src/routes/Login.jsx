import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
      mode: "cors",
    });
    const token = await res.json();
    login(token, formData.username);
    const to = `/profile/${formData.username}`;
    return () => navigate(to, { replace: true });
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <fieldset
          style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
          />
          <button type="submit" style={{ backgroundColor: "lightblue" }}>
            Login
          </button>
        </fieldset>
      </Form>
    </div>
  );
}
