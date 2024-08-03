import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import packageRouter from "./routes/packageRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

//db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/package", packageRouter);
app.use("/api/checkout", orderRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
