const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const cropRoutes = require("./routes/cropRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/crops", cropRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "AgriFlow Backend is running!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`AgriFlow server running on http://localhost:${PORT}`);
});