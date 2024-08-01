import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://webkriti:abviiitm@cluster0.5dyr4fa.mongodb.net/travel-ticket"
    )
    .then(() => console.log("DB Connected"));
};

export default connectDB;
