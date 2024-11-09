import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export let generateCookieToken = async (res, createUser) => {
  let userOption = {
    userId: createUser._id,
  };
  let token = await jwt.sign(userOption, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // return token;
};
