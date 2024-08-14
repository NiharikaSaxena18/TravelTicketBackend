import express from "express";
import nodemailer from "nodemailer";

const newsletter = express.Router();

const subscribeToNewsletter = (email) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: "Thank you for subscribing to TravelToor!",
      text: "You have successfully subscribed to our newsletter. We will keep you updated with our latest offers and news.",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

newsletter.post("/", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  subscribeToNewsletter(email)
    .then(() => {
      res.json({ success: true, message: "Subscription successful" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "Error subscribing" });
    });
});

export default newsletter;
