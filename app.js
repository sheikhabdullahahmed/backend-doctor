require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./Controllers/authcontrollers");
const adminroutes = require("./Controllers/admincontrollers");
const doctorroutes = require("./Controllers/doctorcontrllers");
const appointment = require("./Controllers/appoiment");
const cookieParser = require("cookie-parser");
// const requireAuth = require("./middleware/authmiddleware");

const app = express();

app.use(cors({
  origin: "https://frontend-doctor-seven.vercel.app",
  credentials: true,
}));

app.options("*", cors({
  origin: "https://frontend-doctor-seven.vercel.app",
  credentials: true,
}));


// Middleware
app.use(express.json());



app.use(cors(corsOptions));
// app.options("*", cors());
app.use(cookieParser());

// Connect MongoDB
connectDB();

// Routes
app.use("/", userRoutes); // Example route
app.use("/", adminroutes);
app.use("/", doctorroutes);
app.use("/", appointment);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
