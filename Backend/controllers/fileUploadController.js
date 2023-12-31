const express = require("express");
const router = express.Router();
const FileUpload = require("./../models/fileUpload");
// const CryptoJS = require("crypto-js"); /*Used for hashing the password*/
const jwt = require("jsonwebtoken");
const secretKey = "kamran";
// const loginData = require("../middleware/loginData");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});
module.exports.imageUploadController = async (req, res) => {
  // console.log("Image details", req.files);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log("Uplaod Image", result);
    res.json({
      url: result.secure_url,
      // public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};
