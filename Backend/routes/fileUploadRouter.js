// // const express = require("express");
// // const multer = require("multer");
// // const uploadController = require("../controllers/fileUploadController");

// // const router = express.Router();
// // const upload = multer({ dest: "uploads/" });

// // router.post("/upload", upload.single("file"), uploadController.uploadFile);

// const express = require("express");
// const router = express.Router();
// // const formidable = require("express-formidable");
// const cloudinary = require("cloudinary").v2;
// const uploadController = require("../controllers/fileUploadController");

// // app.use(formidable()); // Add formidable middleware

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME, // replace with your Cloudinary cloud name
//   api_key: process.env.CLOUDINARY_API, // replace with your Cloudinary API key
//   api_secret: process.env.CLOUDINARY_SECRET, // replace with your Cloudinary API secret
// });

// router.post("/upload", uploadController.uploadFile);

// module.exports = router;

const express = require("express");
// const loginData = require("./../middleware/loginData");
const router = express.Router();
const uploadController = require("../controllers/fileUploadController");
// const upload = require("../middleware/image");
const expressFormidable = require("express-formidable");
// const imageUploadController = require("../controller/productController")
// router.route("/addProduct").post(product.addProduct);
router
  .route("/upload-image")
  .post(
    expressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
    uploadController.imageUploadController
  );

module.exports = router;
