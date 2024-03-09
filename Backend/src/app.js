// This is the main file here iam creating server instanace and routing and middleware applied
// Dotenv at the top for configuring
import "./dotenv.config.js";

// Imports
import express from "express";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers imports

// Creating server
const app = express();

// Setting up cors
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies)
  })
);

// Cookie parser
app.use(cookieParser());

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default route
app.get("/", (req, res, next) => {
  res.send("Welcome to the Record Manager app :)");
});

// Routes

// Handling invalid routes
app.use((req, res, next) => {
  res.json({
    success: false,
    error: "Invalid api! Enter valid api here please",
  });
});

// Error handler middleware
app.use(ErrorHandlerMiddleware);

// Exporting server
export default app;
