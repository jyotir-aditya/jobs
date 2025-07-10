import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jobuser:Password123@jobportal.sdwmh8l.mongodb.net/jobportal?retryWrites=true&w=majority",
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
