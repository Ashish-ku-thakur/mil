import cloudinary from "../cloudinary/cloudinaryConfig.js";
import Order from "../models/orderModel.js";
import Restaurent from "../models/restaurentModel.js";
import { uploadeImageOnCloudinary } from "../utils/imageupload.js";

export let createRestaurent = async (req, res) => {
  try {
    let { restaurentName, city, country, deleveryTime, cuisiens } = req.body;
    let userId = req.id;
    let file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Restaurant photo is required",
        success: false,
      });
    }

    // Check if restaurant already exists for the user
    let restaurent = await Restaurent.findOne({ user: userId });
    if (restaurent) {
      return res.status(400).json({
        message: "You already have a restaurant",
        success: false,
      });
    }

    // Upload image to Cloudinary
    let imageUri = await uploadeImageOnCloudinary(file);

    let cloudResponse;
    if (imageUri) {
      // Corrected with 'await'
      cloudResponse = await cloudinary.uploader.upload(imageUri, {
        folder: "restaurant_photo",
        transformation: [{ width: 900, height: 700, crop: "limit" }],
      });
    }

    // Create a new restaurant in the database
    restaurent = await Restaurent.create({
      user: userId,
      restaurentName,
      city,
      country,
      deleveryTime,
      cuisiens,
      restaurentPhoto: cloudResponse?.secure_url,
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      success: true,
      restaurent,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export let getRestaurent = async (req, res) => {
  try {
    let userId = req.id;

    let restaurent = await Restaurent.find({ user: userId });

    if (!restaurent) {
      return res.status(400).json({
        message: "you donn't have any restaurent",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export let updateRestaurent = async (req, res) => {
  try {
    let userId = req.id;
    let { restaurentName, city, country } = req.body;
    let file = req.file;

    let restaurent = await Restaurent.find({ user: userId });

    if (!restaurent) {
      return res.status(400).json({
        message: "you donn't have any restaurent",
        success: false,
      });
    }
    // restaurentName, city, country, deleveryTime, cuisiens
    let cloudResponse;
    if (file) {
      let imageUri = await uploadeImageOnCloudinary(file);
      cloudResponse = cloudinary.uploader.upload(imageUri, {
        folder: "restaurant_photo",
        transformation: [{ width: 900, height: 700, crop: "limit" }],
      });
    }
    restaurent.restaurentPhoto = cloudResponse.secure_url;

    if (restaurentName) restaurent.restaurentName = restaurentName;
    if (city) restaurent.city = city;
    if (country) restaurent.country = country;
    if (deleveryTime) restaurent.deleveryTime = deleveryTime;
    if (cuisiens) restaurent.cuisiens = JSON.parse(cuisiens);
    await restaurent.save();

    return res.status(200).json({
      message: "Update Restaurent Successfully",
      success: true,
      restaurent,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export let getRestaurentOrder = async (req, res) => {
  try {
    let userId = req.id;
    let restaurent = await Restaurent.findOne({ user: userId });

    if (!restaurent) {
      return res.status(400).json({
        message: "you donn't have any restaurent",
        success: false,
      });
    }

    let order = await Order.find({ restaurentDetails: restaurent._id })
      .populate("restaurentDetails")
      .populate("userDetails");

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export let updateOrderstatus = async (req, res) => {
  try {
    let { orderId } = req.params;
    let { status } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({
        message: "order id is required",
        success: false,
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "order status updateed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export let searchRestaurent = async (req, res) => {
  try {
    let searchText = req.params.searchText || "";
    let searchQuery = req.query.searchQuery || "";
    let selectCuisiens = (req.query.selectCuisiens || "")
      .split(",")
      .filter((ele) => ele);

    let query = {};
    if (selectCuisiens) {
      query.$or = [
        { restaurentName: { $regex: searchText, $option: "i" } },
        { ciyt: { $regex: searchText, $option: "i" } },
        { country: { $regex: searchText, $option: "i" } },
      ];
    }
    if (searchQuery) {
      query.$or = [
        { restaurentName: { $regex: searchText, $option: "i" } },
        { cuisiens: { $regex: searchQuery, $option: "i" } },
      ];
    }
    if (selectCuisiens.length > 0) {
      query.cuisiens = { $in: selectCuisiens };
    }

    let restaurent = await Restaurent.find(query);
    return res.status(200).json({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export let singleRestaurent = async (req, res) => {
  try {
    let restaurentId = req.params.id;
    let restaurent = await Restaurent.findById(restaurentId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });

    if (!restaurent) {
      return res.status(400).json({
        success: false,
        message: "Restaurent not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
