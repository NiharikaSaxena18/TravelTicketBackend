import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  location: { type: Object, required: true },
  travelDates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
  promoCode: { type: String, default: "" },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
