import Order from "../models/orderModel.js";
import Restaurent from "../models/restaurentModel.js";
import razorpay from "../razorpay/razorpayConfig.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export let createCheckOutSession = async (req, res) => {
  try {
    const { checkOutSessionRequest } = req.body; // Contains cartItems, deliveryData, and restaurantId

    // Find restaurant details
    const restaurent = await Restaurent.findById(
      checkOutSessionRequest.restaurentDetails
    );
    if (!restaurent) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    // Razorpay order options
    const options = {
      amount: checkOutSessionRequest.amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
      notes: {
        success_url: `${process.env.FRONTEND_URI}/order`,
        cancel_url: `${process.env.FRONTEND_URI}/cart`,
      },
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);
    if (!razorpayOrder) {
      return res.status(500).json({
        success: false,
        message: "Error creating Razorpay order.",
      });
    }
    console.log("Local Razorpay order ID:", razorpayOrder.id);

    // Create a new order in your database
    const orderCreate = await Order.create({
      userDetails: req.id,
      restaurentDetails: restaurent._id,
      deleveryDetails: checkOutSessionRequest.deleveryDetails,
      cartItem: checkOutSessionRequest.cartItem,
      totalAmount: checkOutSessionRequest.amount,
      razorpayOrderId: razorpayOrder.id,
      status: "pending",
    });

    let key_id = process.env.REZORPAY_KEY_ID;
    // Respond with Razorpay order details
    res.status(201).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      order: razorpayOrder,
      key_id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export let razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_SECRET_KEY;
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const rawBody = req.rawBody;

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("Invalid Razorpay signature.");
      return res.status(400).json({ error: "Invalid signature." });
    }

    console.log("Signature verified successfully");

    const razorpayOrderId = req.body.payload.payment.entity.order_id;
    console.log("Payment order ID:", razorpayOrderId);

    // Fetch the order from local database
    const order = await Order.findOne({ razorpayOrderId });
    if (!order) {
      console.error(
        `Order not found for Razorpay order ID: ${razorpayOrderId}`
      );
      return res.status(404).json({ message: "Order not found." });
    }

    // Update the order status
    order.status = "paid";
    await order.save();

    console.log("Order updated successfully.");
    res.status(200).json({ message: "Webhook processed successfully." });
  } catch (error) {
    console.error("Error in Razorpay webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export let getOrders = async (req, res) => {
  try {
    let orders = await Order.find({ userDetails: req.id })
      .populate("userDetails")
      .populate("restaurentDetails");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
