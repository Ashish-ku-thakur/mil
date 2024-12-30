import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbconnection } from "./database/mongoConnection.js";
import userRouter from "./router/userRouter.js";
import restaurentRouter from "./router/restaurentRouter.js";
import menuRouter from "./router/menuRouter.js";
import oderRouter from "./router/orderRouter.js";
import path from "path";

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
let dirname = path.resolve(); // give the current dir path (backend)

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsoption));

// Router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurent", restaurentRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", oderRouter);

app.use(express.static(path.join(dirname, "/frontend/dist")));
// we have to set our root folder (dist means sorce of frontend folder)
// C:\Users\DELL\Desktop\main\clone rest\backend\frontend\dist (this is not right approch) 
//  ->  C:\Users\DELL\Desktop\main\clone rest\frontend\dist (../)

app.use("*", (req, res) => {
  // res.sendFile(path.join(dirname, "../frontend/dist/index.html"));//kaam same hi karega
  res.sendFile(path.join(dirname, "/frontend/dist/index.html")); //for best practice
});

app.listen(PORT, () => {
  dbconnection();

  console.log(`Server is started on port ${PORT}`);
});
