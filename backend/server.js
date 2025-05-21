// backend/server.js
require("dotenv").config(); // loads .env
const express = require("express"); // import Express
const cors = require("cors"); // import CORS middleware
const connectDB = require("./config/db"); // import our DB connector

const app = express();

// Enable CORS so your React app (localhost:3000) can talk to this API
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Parse JSON bodies on incoming requests
app.use(express.json());

// Connect to MongoDB (logs “MongoDB connected” if successful)
connectDB();

// Mount routers (each `require` here pulls in the Router from that file)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// A simple health-check endpoint
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
