import packages from "../models/packageModel.js";

const showPackages = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const totalDocuments = await packages.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limitNumber);

    const results = await packages
      .find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({ results, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchEngine = async (req, res) => {
  try {
    const { location, price } = req.query;
    if (!location || !price) {
      return res
        .status(400)
        .json({ message: "Location and price are required" });
    }
    const query = {
      $and: [
        { location: { $regex: location, $options: "i" } },
        { price: { $lte: parseInt(price) } },
      ],
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
    await packages.findById(id).then((listing) => {
      res.json(listing);
    });
  } catch (error) {
    console.log(error);
  }
};

export { showPackages, showDetailPackages, searchEngine };
