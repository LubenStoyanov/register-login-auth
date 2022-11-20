import express from "express";
import * as fs from "fs";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import connectDB, { User } from "./db.js";
import validateToken from "./validateToken.js";

const app = express();
const port = process.env.PORT || 8080;

export const privateKey = fs.readFileSync("private.key");
const saltRounds = 10;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.sendStatus(200);
});

app.post("/register", async (req, res) => {
  console.log("register");
  try {
    const { username, email, password } = req.body;
    connectDB();
    const exists = await User.findOne({ email: email });
    if (exists)
      return res.status(409).send("User Already Exists. Please Login.");
    const token = jwt.sign({ username: username }, privateKey);
    const hashedPW = await bcrypt.hash(password, saltRounds);
    connectDB();
    await User.create({
      username: username,
      email: email,
      password: hashedPW,
      token: token,
    });
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  console.log("login");
  try {
    const { username, password } = req.body;
    connectDB();
    const user = await User.findOne({ username: username }, "password");
    const loginVerified = await bcrypt.compare(password, user.password);
    if (!loginVerified) return res.status(401).send("Wrong Password");
    const token = jwt.sign({ username: username }, privateKey);
    await User.updateOne({ username: username }, { $set: { token: token } });
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/logout", async (req, res) => {
  try {
    console.log("logout");
    const { username } = req.body;
    connectDB();
    await User.updateOne({ username: username }, { $set: { token: null } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
});

app.post("/profile/:username", validateToken, (req, res) => {
  console.log("Token is valid.");
  console.log(req.username);
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
