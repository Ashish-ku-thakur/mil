import Order from "../models/orderModel.js";
import Restaurent from "../models/restaurentModel.js";
import razorpay from "../razorpay/razorpayConfig.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Create Checkout Session
export let createCheckOutSession = async (req, res) => {
  try {
    const { checkOutSessionRequest } = req.body; // Contains cartItems, deliveryData, and restaurantId

    // console.log(checkOutSessionRequest);

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
      amount: checkOutSessionRequest.amount * 100, // Amount in paise (Razorpay requires this format)
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

    // Create a new order in your database with Razorpay order ID
    const orderCreate = await Order.create({
      userDetails: req.id,
      restaurentDetails: restaurent._id,
      deleveryDetails: checkOutSessionRequest.deleveryDetails,
      cartItem: checkOutSessionRequest.cartItem,
      totalAmount: checkOutSessionRequest.amount,
      razorpayOrderId: razorpayOrder.id, // Save Razorpay order ID here
      status: "pending",
    });

    // Respond with Razorpay order details
    res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      key_id: process.env.RAZORPAY_KEY_ID,
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Razorpay Webhook
export let razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_SECRET_KEY;
    if (!webhookSecret) {
      return res.status(500).json({ error: "Webhook secret not configured." });
    }

    // Verify Razorpay signature
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const body = req.rawBody; // Raw body is required for HMAC signature verification

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.log({
        expectedSignature: expectedSignature,
        razorpaySignature: razorpaySignature,
      });

      return res.status(400).json({ error: "Invalid Razorpay signature." });
    }

    console.log("Signature verified successfully");

    // Handle Razorpay events
    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "payment.captured") {
      const payment = payload.payment.entity;

      // Update order status to "confirmed" in your database
      const order = await Order.findOne({ razorpayOrderId: payment.order_id });
      console.log({ razorpayOrderId: payment.order_id }, order);

      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }

      order.status = "paid";
      order.razorpayOrderId = payment.id;
      order.totalAmount = payment.amount;
      await order.save();

      console.log("Order updated successfully.");
    } else {
      console.warn(`Unhandled event type: ${event}`);
    }

    res.status(200).json({ status: "Webhook processed successfully." });
  } catch (error) {
    console.error("Error processing webhook:", error);
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
