import mongoose from "mongoose";

export async function connectDB() {
  console.log("MONGO_URI", process.env.MONGO_URI);
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set in env");
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}
