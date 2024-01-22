const express = require("express");
const multer = require("multer");
const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage: storage });

// Handle file upload
router.post("/upload", upload.single("image"), (req, res) => {
  // Process the uploaded file, save to database or cloud storage, etc.
  const fileUrl = `http://localhost:8000/${req.file.path}`; // Example URL for the uploaded file
  res.json({ fileUrl });
});

module.exports = router;
