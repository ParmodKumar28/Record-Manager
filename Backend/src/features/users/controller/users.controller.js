// controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../model/users.repository.js";
import ErrorHandler from "../../../utils/ErrorHandler.js";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return next(
        new ErrorHandler(400, "Enter username and password properly!")
      );
    }

    // Check if user already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return next(new ErrorHandler(400, "Username already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createUser({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await findUserByUsername(username);
    if (!user) {
      return next(new ErrorHandler(400, "Invalid credentials"));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler(400, "Invalid credentials"));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour in milliseconds
      secure: true, // Set to true if serving over HTTPS
      sameSite: "strict",
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};
