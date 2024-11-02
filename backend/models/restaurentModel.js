import mongoose from "mongoose";

let restaurentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurentName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deleveryTime: { type: Number, required: true },
    cuisiens: [{ type: String, required: true }],
    menus:[{  type:mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    restaurentPhoto: { type: String, required: true },
  },
  { timestamps: true }
);
let Restaurent = mongoose.model("Restaurent", restaurentSchema);
export default Restaurent;