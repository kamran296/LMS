const express = require("express");
const router = express.Router();
const admissionController = require("../controllers/admissionController");
const loginData = require("../middleware/loginData");
// Routes for admissions
router.route("/getalladmissions").get(admissionController.getAllAdmissions);
router.route("/:admissionId").get(admissionController.getAdmissionById);
router
  .route("/create-admission")
  .post(loginData, admissionController.createAdmission);
router.route("/:admissionId").put(admissionController.updateAdmission);
router
  .route("/:admissionId")
  .delete(loginData, admissionController.deleteAdmission);

module.exports = router;
