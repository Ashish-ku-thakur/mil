import express from "express";
import { addMenu, editMenu } from "../controller/menuControler.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

let router = express.Router();

router.route("/addMenu").post(isAuth, upload.single("menuImage"), addMenu);
router
  .route("/editMenu/:id")
  .patch(isAuth, upload.single("menuImage"), editMenu);

export default router;
