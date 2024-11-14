import Razorpay from "razorpay";

let razorpay = new Razorpay({
  key_id: process.env.REZORPAY_KEY_ID,
  key_secret: process.env.REZORPAY_KEY_SECRET,
});

export default razorpay
