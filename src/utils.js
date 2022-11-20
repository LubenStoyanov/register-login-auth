export default () => {
  const cookies = document.cookie.split(";");
  return cookies
    .find((c) => c.trim().split("=").shift() === "token")
    .trim()
    .split("=")
    .pop();
};

export const setToken = (newValue) => {
  try {
    window.localStorage.setItem("token", JSON.stringify(newValue));
  } catch (error) {
    console.error(error);
  }
};

export const checkToken = async () => {
  const token = await JSON.parse(window.localStorage.getItem("token"));
  try {
    const res = await fetch("http://localhost:8080/profile/asd", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ token: token }),
      mode: "cors",
    });
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
