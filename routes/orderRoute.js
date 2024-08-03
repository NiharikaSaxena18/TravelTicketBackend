import express from "express";
import {
  placeOrder,
  verifyOrder,
  displayOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const checkoutRouter = express.Router();

// sending data to server
checkoutRouter.post("/payment", authMiddleware, placeOrder);
checkoutRouter.post("/verify", verifyOrder);
checkoutRouter.post("/booked", authMiddleware, displayOrder);

export default checkoutRouter;
