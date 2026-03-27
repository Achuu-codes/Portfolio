import mongoose from "mongoose";

export async function connectDB() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.warn("MongoDB URI not provided. Contact messages will not be persisted.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
