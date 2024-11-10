import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export let isAuth = async (req, res, next) => {
  try {
    let  token  = req.cookies.token

    if (!token) {
        return res.status(400).json({
          message: "User is not Authenticated",
          success: false,
        });
      }

    let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(400).json({
        message: "invalid token",
        success: false,
      });
    }

    req.id = decode.userId
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
