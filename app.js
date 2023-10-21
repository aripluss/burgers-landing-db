const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const burgersRouter = require("./routes/api/burgers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// Middleware
app.use(logger(formatsLogger)); // Logging HTTP requests to the console in development mode
app.use(cors()); // Enabling cross-origin resource sharing
app.use(express.json());
app.use(express.static("public"));

// Routing setup
app.use("/api/auth", authRouter);
app.use("/api/burgers", burgersRouter);

// Error Processing
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
