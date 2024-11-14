import Order from "../models/orderModel.js";
import Restaurent from "../models/restaurentModel.js";
import razorpay from "../razorpay/razorpayConfig.js";

// todo order controller
export let createCheckOutSession = async (req, res) => {
  try {
    let { checkOutSessionRequest, amount } = req.body; //cartitems && deleveryData + restaurentId
    let restaurent = await Restaurent.findById(
      checkOutSessionRequest.restaurentId
    ).populate("restaurentDetails");

    if (!restaurent) {
      return res.status(400).json({
        message: "Restaurent not Found",
        success: false,
      });
    }

    let orderCreate = await Order.create({
      userDetails: req.id,
      restaurentDetails: restaurent._id, // checkOutSessionRequest.restaurentId
      deleveryDetails: checkOutSessionRequest.deleveryDetails,
      cartItem: checkOutSessionRequest.cartItem,
      status: "pending",
    });

    let options = {
      amount: amount * 100, // inr ruppess
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        cartItem,
        success_url: `${process.env.FRONTEND_URI}/order/status`,
        cencel_url: `${process.env.FRONTEND_URI}/cart`,
        metaData: orderCreate,
      },
    };

    let order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export let getOrders = async (req, res) => {
  try {
    let orders = await Order.find({ userDetails: req.id })
      .populate("userDetails")
      .populate("restaurentDetails");

    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
