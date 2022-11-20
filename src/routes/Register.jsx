import { Form, redirect } from "react-router-dom";
import { register } from "../utils";

export const action = async ({ request }) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    const response = register(formData);
    if (!response.ok) return redirect("/");
    return redirect(`/login`);
  } catch (error) {
    console.error(error);
  }
};

function Root() {
  return (
    <div className="Root">
      <Form method="post" action="/register">
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
            defaultValue="asd"
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            id="email"
            required
            defaultValue="asd@asd.com"
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
            defaultValue="asd"
          />
          <button type="submit" style={{ backgroundColor: "lightblue" }}>
            Register
          </button>
        </fieldset>
      </Form>
    </div>
  );
}

export default Root;
