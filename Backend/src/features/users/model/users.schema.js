// User schema
// Imports
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

// Exporting model
export default User;
