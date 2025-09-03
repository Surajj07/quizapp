import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
  } catch (err) {
    throw err;
  }
}
