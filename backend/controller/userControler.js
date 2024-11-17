import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { generateSixdigitToken } from "../utils/generateSixdigitToken.js";
import { sendEmail, sendwelcomwemail } from "../nodemailer/sendemails.js";
import { generateCookieToken } from "../utils/generateCookieToken.js";
import { uploadeImageOnCloudinary } from "../utils/imageupload.js";
import cloudinary from "../cloudinary/cloudinaryConfig.js";

dotenv.config();

export let signup = async (req, res) => {
  try {
    let { fullname, email, password, contact } = req.body;
    // console.log(email);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message:
          "User already exists with this email. Please try a different email.",
        success: false,
      });
    }

    // Hash password for security
    let hashPassword = await bcryptjs.hash(password, 10);

    // Generate 6-digit verification token
    let verificationTokenCreate = generateSixdigitToken();

    let createUser = await User.create({
      fullname,
      email,
      password: hashPassword,
      contact: Number(contact),
      verificationToken: verificationTokenCreate,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await generateCookieToken(res, createUser);

    await sendEmail(email, verificationTokenCreate); // Replace with the recipient's email

    // Return user data without the password
    let userWithoutPassword = await User.findOne({ email }).select("-password");

    return res.status(201).json({
      message: "New User Created",
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email }); //

    if (!user) {
      return res.status(400).json({
        message: "email and password is not correct",
        success: false,
      });
    }

    // match password
    let isMatchPassword = await bcryptjs.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        message: "password and email is not correct",
        success: false,
      });
    }

    // cookie token
    await generateCookieToken(res, user); // for login

    // every thing is correct then set last login

    user.lastLogin = new Date();
    await user.save();

    let userWithoutPassword = await User.findOne({ email }).select("-password");

    return res.status(200).json({
      message: `welcome back ${user.fullname}`,
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export let verifiedEmail = async (req, res) => {
  try {
    let { verificationCode } = req.body;

    let user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }); // 6    digit se dhundenge

    if (!user) {
      return res.status(400).json({
        message: "invalid or expired verification code",
        success: false,
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();

    //sendemail code for successfully email verify
    await sendwelcomwemail(user);

    let userWithoutPassword = await User.findById(user._id).select("-password");

    return res.status(200).json({
      message: "Email Verified Successfully",
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export let logout = async (req, res) => {
  try {
    return res.clearCookie("token").status(200).json({
      message: "user logout successfully",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export let forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "email is not exist try again",
        success: false,
      });
    }

    // create a reset link
    let resetLink = crypto.randomBytes(10).toString("hex");

    user.resetPasswordToken = resetLink;
    user.resetPasswordTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 2 hours
    await user.save();

    //send reset link in email
    await sendPasswordResetLink(
      email,
      `${process.env.FRONTEND_URI}/resetLink/${resetLink}`
    );

    return res.status(200).json({
      message: "Password reset link send to your email",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export let setNewPassword = async (req, res) => {
  try {
    let { newPassword } = req.body;
    let { newPasswordLink } = req.params;

    let user = await User.findOne({
      resetPasswordToken: newPasswordLink,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid or expired resetPasswordLink",
        success: false,
      });
    }

    // change old password with newpassword

    let hashPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiresAt = null;
    await user.save();

    // send email for successfully password change
    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export let checkAuth = async (req, res) => {
  try {
    let userId = req.id;

    let user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export let updateProfile = async (req, res) => {
  try {
    let userId = req.id;
    let { fullname, city, address, country, profilePhoto } = req.body;
    // console.log("reqdata", req?.body);

    let user = await User.findById(userId).select("-password");

    let cloudResponse;
    if (profilePhoto) {
      cloudResponse = await cloudinary.uploader.upload(profilePhoto, {
        folder: "user_profiles", // You can specify a folder in Cloudinary
        // public_id: `profile_${userId}`, // Custom public IDz
        transformation: [{ width: 300, height: 300, crop: "limit" }], // Optional transformation
      });
      user.profilePhoto = cloudResponse?.secure_url;
    }
    if (fullname) user.fullname = fullname;
    if (city) user.city = city;
    if (address) user.address = address;
    if (country) user.country = country;
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user, // Yeh updated user object hai, jo latest data client ko send karega
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
