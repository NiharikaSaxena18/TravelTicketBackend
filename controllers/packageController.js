import packages from "../models/packageModel.js";
import mongoose from "mongoose";

const showPackages = async (req, res) => {
  await packages
    .find()
    .then((listings) => res.json(listings))
    .catch((err) => res.json(err));
};

const searchEngine = async (req, res) => {
  try {
    const { location, price } = req.params;
    if (!location || !price) {
      return res
        .status(400)
        .json({ message: "Location and price are required" });
    }
    const query = {
      location: { $regex: location, $options: "i" },
      price: { $lte: parseInt(price) },
    };
    const results = await packages.find(query).limit(10);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const showDetailPackages = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }
    await packages.findById(id).then((listing) => {
      res.json(listing);
    });
  } catch (error) {
    console.log(error);
  }
};

export { showPackages, showDetailPackages, searchEngine };
