import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { Schema } from "mongoose";

export default () => mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: 1,
  },
  email: { type: String, required: true, unique: 1 },
  password: { type: String, required: true },
  token: {
    type: String,
  },
});
export const User = mongoose.model("User", userSchema);
