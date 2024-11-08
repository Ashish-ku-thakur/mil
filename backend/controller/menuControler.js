import cloudinary from "../cloudinary/cloudinaryConfig.js";
import Menu from "../models/meneModel.js";
import Restaurent from "../models/restaurentModel.js";
import { uploadeImageOnCloudinary } from "../utils/imageupload.js";

export let addMenu = async (req, res) => {
  try {
    let { name, description, price } = req.body;
    let file = req.file;
    let userId = req.id;

    let cloudResponse;
    if (file) {
      let imageuri = await uploadeImageOnCloudinary(file);
      cloudResponse = cloudinary.uploader.upload(imageuri, {
        folder: "menu_image",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
    }

    let menu = await Menu.create({
      menuPhoto: cloudResponse.secure_url,
      name,
      description,
      price: Number(price),
    });

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "menu is not Created Successfully",
      });
    }

    let restaurent = await Restaurent.findById(userId);
    if (restaurent) {
      restaurent.menus.push(menu._id);
      await restaurent.save();
    }

    return res.status(201).json({
      success: true,
      message: "menu Created Successfully",
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
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

    let cloudResponse;
    if (file) {
      let imageuri = await uploadeImageOnCloudinary(file);
      cloudResponse = cloudResponse = cloudinary.uploader.upload(imageuri, {
        folder: "menu_image",
        transformation: [{ width: 400, height: 400, crop: "limit" }],
      });
    }

    menu.menuPhoto = cloudResponse.secure_url;
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;
    await menu.save();

    return res.status(200).json({
      message: "Menu is updated successFully",
      success: true,
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
