const express = require("express");
const router = express.Router();

const enquiryController = require("../controllers/enquiryController");

router.route("/getallenquiry").get(enquiryController.getallenquiry);
router.route("/createEnquiry").post(enquiryController.createEnquiry);

module.exports = router;
