const mongoose = require("mongoose");

async function connectDB() {
  const connectionURI =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;

  try {
    await mongoose.connect(connectionURI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function closeConnection() {
    await mongoose.connection.close();
}

module.exports = { connectDB, disconnectDB, closeConnection };
