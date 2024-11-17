import cloudinary from "../cloudinary/cloudinaryConfig.js";
import Menu from "../models/meneModel.js";
import Restaurent from "../models/restaurentModel.js";
import { uploadeImageOnCloudinary } from "../utils/imageupload.js";

export const addMenu = async (req, res) => {
  try {
    // Extract fields from the request
    const { name, description, price } = req.body;
    const file = req.file;

    // Check if file exists, if not, return an error
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image to Cloudinary and handle potential errors
    const imageUrl = await uploadeImageOnCloudinary(file);
    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    // Further upload image to Cloudinary with transformations
    let cloudResponse;
    try {
      cloudResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: "menu-image",
        transformation: [{ width: 900, height: 700, crop: "limit" }],
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary upload failed:", cloudinaryError);
      return res.status(500).json({
        success: false,
        message: "Image upload failed on Cloudinary",
      });
    }

    // Create menu item in the database
    const menu = await Menu.create({
      name,
      description,
      price,
      menuPhoto: cloudResponse.secure_url,
    });

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "Menu is not created",
      });
    }

    // Find restaurant and link the menu
    const restaurant = await Restaurent.findOne({ user: req.id });
    if (restaurant) {
      restaurant.menus.push(menu._id);
      await restaurant.save();
    }

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export let editMenu = async (req, res) => {
  try {
    let menuId = req.params.id;
    let { name, description, price } = req.body;
    let file = req.file;

    let menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(400).json({
        message: "menu is not find",
        success: false,
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "menuPhoto is not find",
        success: false,
      });
    }
    
    let imageuri;
    if (file) {
      imageuri = await uploadeImageOnCloudinary(file);
    }

    let cloudResponse;
    if (imageuri) {
      cloudResponse = await cloudinary.uploader.upload(imageuri, {
        folder: "menu-image",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
    }

    menu.menuPhoto = cloudResponse?.secure_url;

    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = Number(price);
    await menu.save();

    return res.status(200).json({
      message: "Menu is updated successFully",
      success: true,
      menu,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
