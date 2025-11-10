const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection string (.env se)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop server if DB not connected
  }
};

module.exports = connectDB;
