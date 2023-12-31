const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads"); // Define the destination folder
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     const ext = path.extname(file.originalname);
//     return cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// Create the .tmp directory if it doesn't exist
const tmpDir = "./.tmp";
const fs = require("fs");

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = file.originalname.split(".").pop(); // Get the file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

// const upload = multer({ storage: storage });
const upload = multer({ storage: storage });

module.exports = upload;
