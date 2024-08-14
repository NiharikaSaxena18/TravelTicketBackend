import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const placeOrder = async (req, res) => {
  const frontend_url =
    "https://akashtripathi12.github.io/TravelTicketFrontend/public/pages/verify.html";
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.startDate);
    endDate.setDate(endDate.getDate() + parseInt(req.body.journeyDuration));

    const newOrder = new orderModel({
      userId: req.body.userId,
      amount: req.body.amount,
      address: req.body.street,
      location: req.body.location,
      promoCode: req.body.promoCode,
      travelDates: {
        startDate: startDate,
        endDate: endDate,
      },
    });

    await newOrder.save();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: req.body.amount * 100,
            product_data: {
              name: "Travel Tour",
              description: "Travel Tour Purchase",
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
    res.json({ success: false });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      const order = await orderModel.findById(orderId);
      const user = await userModel.findById(order.userId);
      if (order.promoCode) {
        if (!user.usedPromoCodes) {
          user.usedPromoCodes = [];
        }
        user.usedPromoCodes.push(order.promoCode);
        await user.save();
      }
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

const displayOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const promoValidate = async (req, res) => {
  const { promoCode } = req.body;
  const userId = req.body.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.json({ success: false, message: "User not found" });
      return;
    }

    if (!user.usedPromoCodes) {
      user.usedPromoCodes = [];
    }

    if (user.usedPromoCodes.includes(promoCode)) {
      res.json({ success: false, message: "Promo code already used" });
      return;
    }

    let discountPercentage;
    if (promoCode === "HAPPY25") {
      discountPercentage = 25;
    } else if (promoCode === "HAPPY30") {
      discountPercentage = 30;
    } else {
      res.json({ success: false, message: "Invalid promo code" });
      return;
    }

    res.json({ success: true, discountPercentage });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error validating promo code" });
  }
};

export { placeOrder, verifyOrder, displayOrder, promoValidate };
