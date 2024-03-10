// This is the main file here iam creating server instanace and routing and middleware applied
// Dotenv at the top for configuring
import "./dotenv.config.js";

// Imports
import express from "express";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyToken from "./middlewares/auth.js";

// Routers imports
import usersRouter from "./features/users/routes/users.routes.js";
import recordsRouter from "./features/records/routes/records.routes.js";

// Creating server
const app = express();

// Setting up cors
// app.use(
//   cors({
//     // origin: [
//     //   "https://record-manager-ug87.onrender.com",
//     //   "https://record-manager88.netlify.app",
//     // ], // Replace with your frontend origin
//     origin: "*",
//     credentials: true, // Allow credentials (cookies)
//   })
// );
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://record-manager-ug87.onrender.com",
    "https://record-manager88.netlify.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

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
app.use("/api/users", usersRouter);
app.use("/api/records", verifyToken, recordsRouter);

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
