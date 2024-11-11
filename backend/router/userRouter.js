import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  setNewPassword,
  signup,
  updateProfile,
  verifiedEmail,
} from "../controller/userControler.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

let router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/verifiedEmail").post(verifiedEmail);
router.route("/logout").post(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/setNewPassword/:newPasswordLink").post(setNewPassword);
router.route("/checkAuth").post(isAuth,checkAuth);
router.route("/updateProfile").patch(isAuth, upload.single('profilePhoto'), updateProfile);

export default router;
