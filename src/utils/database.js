import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default mongoose; // Export the mongoose instance
