import Packages from "../models/packageModel.js";
import initData from "./data.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await connectDB();
}

const initDB = async () => {
  try {
    await Packages.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj }));
    await Packages.insertMany(initData.data);
    console.log("data was initialised");
  } catch (err) {
    console.error(err);
  }
};

initDB();
