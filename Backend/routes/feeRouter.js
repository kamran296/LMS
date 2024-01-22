const express = require("express");
const router = express.Router();
const feeController = require("../controllers/feeController");
const loginData = require("../middleware/loginData");
// Routes for fees
router.get("/getallfees", loginData, feeController.getAllFees);
router.get("/:feeId", loginData, feeController.getFeeById);
router.post("/create-fee", loginData, feeController.createFee);
router.put("/:feeId", loginData, feeController.updateFee);
router.delete("/:feeId", loginData, feeController.deleteFee);

module.exports = router;
