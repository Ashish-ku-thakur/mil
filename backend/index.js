import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbconnection } from "./database/mongoConnection.js";
import userRouter from "./router/userRouter.js";
import restaurentRouter from "./router/restaurentRouter.js";
import menuRouter from "./router/menuRouter.js";
import oderRouter from "./router/orderRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000; // Use your environment variable or default to 8000

let corsoption = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
};

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // Raw body ko preserve karo
    },
  })
);

// app.post(
//   "/api/v1/order/razorpayWebhook",
//   bodyParser.raw({ type: "application/json" }),
//   razorpayWebhook
// );

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsoption));

// Router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurent", restaurentRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", oderRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  dbconnection();
  console.log(`Server is started on port ${PORT}`);
});
