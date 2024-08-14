import jwt from "jsonwebtoken";
import express from "express";
import userModel from "../models/userModel.js";

const verifytoken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Please login again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    const user = await userModel.findById(token_decode.id);
    if (!user) {
      req.loggedIn = false;
    } else {
      req.loggedIn = true;
    }
    next();
  } catch (error) {
    console.log(error);
    req.loggedIn = false;
    next();
  }
};

const verifyRouter = express.Router();

verifyRouter.get("/", verifytoken, (req, res) => {
  if (req.loggedIn) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: true });
  }
});

export default verifyRouter;
