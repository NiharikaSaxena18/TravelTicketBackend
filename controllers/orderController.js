import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const placeOrder = async (req, res) => {
  const frontend_url =
    "http://127.0.0.1:5500/TravelTicketFrontend/public/pages/verify.html";
  try {
    const newOrder = new orderModel({
      userId: "12345689",
      amount: req.body.amount,
      address: req.body.street,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: req.body.amount * 100, // convert to paise
            product_data: {
              name: "Travel Ticket",
              description: "Travel ticket purchase",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${frontend_url}?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messag: "Error occurred" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment not Successful" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some error occurred" });
  }
};

export { placeOrder, verifyOrder };
