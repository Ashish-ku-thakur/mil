import mongoose from "mongoose";

let menuSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    menuPhoto:{type:String, required:true},
}, { timestamps: true });

let Menu = mongoose.model("Menu", menuSchema);
export default Menu;
