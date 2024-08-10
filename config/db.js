import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGOdb_URL)
    .then(() => console.log("DB Connected"));
};

export default connectDB;
