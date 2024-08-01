import express from "express";
import { placeOrder } from "../controllers/orderController.js";

const checkoutRouter = express.Router();

// sending data to server
checkoutRouter.post("/payment", placeOrder);

export default checkoutRouter;
