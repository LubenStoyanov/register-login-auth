import jwt from "jsonwebtoken";
import { privateKey } from "./server.js";
export default (req, res, next) => {
  const { token } = req.body;
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
