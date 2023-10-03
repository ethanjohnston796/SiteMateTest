import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db: string = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("📡MongoDB Connected📡");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
