import jwt from "jsonwebtoken";

export let generateCookieToken = async (res, user) => {
  let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });


  return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
    });
};
