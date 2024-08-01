import packages from "../models/packageModel.js";

const showPackages = async (req, res) => {
  await packages
    .find()
    .then((listings) => res.json(listings))
    .catch((err) => res.json(err));
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

export { showPackages, showDetailPackages };
