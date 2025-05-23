// server.js

const cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Create Express app
const app = express();

// Connect to database
connectDB();

// --- CORS Configuration ---
const rawOrigins =
  process.env.FRONTEND_URLS ||
  process.env.FRONTEND_URL ||
  "http://localhost:3000";
const allowedOrigins = rawOrigins.split(",").map((o) => o.trim());

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy: Origin "${origin}" not allowed`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS and preflight
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Parse JSON bodies
app.use(express.json());
// Parse cookies
app.use(cookieParser());

// --- API Routes ---
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// Health check endpoint
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
