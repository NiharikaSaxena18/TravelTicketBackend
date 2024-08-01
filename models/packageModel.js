import mongoose from "mongoose";
import review from "./reviewModel.js";

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

// packageSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });

const packageModel =
  mongoose.models.package || mongoose.model("Packages", packageSchema);

export default packageModel;
