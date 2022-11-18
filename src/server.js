import express from "express";
import * as fs from "fs";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import connectDB, { User } from "./db.js";

const app = express();
const port = process.env.PORT || 8080;

const privateKey = fs.readFileSync("private.key");
const saltRounds = 10;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.sendStatus(200);
});

const validateToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  jwt.verify(token, privateKey, (err, username) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.username = username;
      next();
    }
  });
};

app.post("/register", async (req, res) => {
  console.log("here");
  try {
    const { username, email, password } = req.body;
    const token = jwt.sign({ username: username }, privateKey);
    const hashedPW = await bcrypt.hash(password, saltRounds);
    connectDB();
    await User.create({
      username: username,
      email: email,
      password: hashedPW,
      token: token,
    });
    res
      .status(200)
      .cookie("jwt", token, { maxAge: 360000, httpOnly: true, secure: true })
      .send("User registered");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    connectDB();
    const hashedPassword = await User.findOne({ username: username });
    const loginVerified = bcrypt.compare(password, hashedPassword);
    if (!loginVerified) return res.status(401).send("Wrong Password");
    const token = jwt.sign({ username: username }, privateKey);
    res
      .status(200)
      .cookie("jwt", token, { maxAge: 360000, httpOnly: true, secure: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/profile/:username", validateToken, (req, res) => {
  console.log("Token is valid.");
  console.log(req.username.username);
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
