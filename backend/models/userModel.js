import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, default: "update your address" },
    city: { type: String, default: "update your city" },
    country: { type: String, default: "update your country" },
    profilePhoto: { type: String, default: null },
    admin: { type: Boolean, default: false },
    // admin
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }, // email is verified
    resetPasswordToken: { type: String, default: null }, // reset password link
    resetPasswordTokenExpiresAt: { type: Date, default: null },
    verificationToken: { type: String, default: null }, //  6  digital code
    verificationTokenExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
export default User;
