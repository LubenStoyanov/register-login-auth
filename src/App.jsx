import { Form, redirect } from "react-router-dom";
import "./App.css";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(username, email, password);
    // await fetch("url", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     email: email,
    //     password: password,
    //   }),
    // });
    return redirect("/home");
  } catch (error) {
    console.error(error);
  }
};

function App() {
  return (
    <div className="App">
      <Form method="post" action="/">
        <fieldset
          style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            id="username"
          />
          <label htmlFor="email">email</label>
          <input type="email" name="email" autoComplete="username" id="email" />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
          />
          <button type="submit" style={{ backgroundColor: "lightblue" }}>
            Register
          </button>
        </fieldset>
      </Form>
    </div>
  );
}

export default App;
