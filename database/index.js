import mongoose from "mongoose";
import Packages from "../models/packageModel.js";

import initData from "./data.js";

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
  await Packages.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
  }));
  await Packages.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
