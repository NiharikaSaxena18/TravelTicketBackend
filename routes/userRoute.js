import express from "express";
import {
  loginUser,
  registerUser,
  detailsUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// sending data to server
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/details", authMiddleware, detailsUser);

export default userRouter;
