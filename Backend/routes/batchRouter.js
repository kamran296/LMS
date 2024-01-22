const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batchController");
const loginData = require("../middleware/loginData");
// Routes for batches
router.route("/getallBatches").get(batchController.getAllBatches);
router.route("/:batchId").get(batchController.getBatchById);
router.route("/create-batch").post(loginData, batchController.createBatch);
router.route("/:batchId").put(loginData, batchController.updateBatch);
router.route("/:batchId").delete(loginData, batchController.deleteBatch);

module.exports = router;
