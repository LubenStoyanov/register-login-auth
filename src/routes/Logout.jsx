import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { setToken } from "../utils";

export const action = async ({ params }) => {
  try {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: params.username }),
      mode: "cors",
    });

    return redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

export default function Logout({ username }) {
  const navigate = useNavigate();
  return (
    <div>
      <Form method="post">
        {/* <input style={{ display: "none" }} name={`${username}`} /> */}
        <button
          onClick={() => {
            setToken(null);
            navigate("/login");
          }}
          type="submit"
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
