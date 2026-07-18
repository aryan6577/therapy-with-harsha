const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to:");
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error");
    console.error(err);
  }
};

module.exports = connectDB;