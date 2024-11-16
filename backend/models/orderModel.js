import mongoose from "mongoose";

let orderSchema = new mongoose.Schema(
  {
    userDetails: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurent",
    },
    deleveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItem: [
      {
        menuId: { type: String, required: true },
        name: { type: String, required: true },
        menuPhoto: { type: String, required: true },
        price: { type: Number, required: true },
        quntity: { type: Number, required: true },
      },
    ],
    totalAmount: Number,
    razorpayOrderId: { type: String }, // Razorpay order ID field
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

let Order = mongoose.model("Order", orderSchema);
export default Order;
