import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    res.json({ success: false, message: "Login failed" });
  }
};

//generating token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking whether user exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating user
    const newUser = await userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = generateToken(user._id);
    res.json({ message: "Successfully Registered", success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some error occurred" });
  }
};

const detailsUser = async (req, res) => {
  try {
    const id = req.body.userId;
    const user = await userModel.findById(id).select("-password -_id -__v");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export { loginUser, registerUser, detailsUser };
