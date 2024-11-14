import express from "express";
import {
  createRestaurent,
  getRestaurent,
  getRestaurentOrder,
  searchRestaurent,
  singleRestaurent,
  updateOrderstatus,
  updateRestaurent,
} from "../controller/restaurentControler.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

let router = express();
router
  .route("/createRestaurent")
  .post(isAuth, upload.single("restaurentPhoto"), createRestaurent);

router.route("/getRestaurent").get(isAuth, getRestaurent);
router
  .route("/updateRestaurent")
  .patch(isAuth, upload.single("restaurentPhoto"), updateRestaurent);
  
router.route("/getRestaurentOrder").get(isAuth, getRestaurentOrder);
router.route("/updateOrderstatus/:id").patch(isAuth,updateOrderstatus);
router.route("/searchRestaurent/:searchText").post(searchRestaurent);
router.route("/singleRestaurent/:id").get(singleRestaurent);

export default router