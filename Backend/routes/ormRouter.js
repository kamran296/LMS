// routes.js
const express = require("express");
const router = express.Router();
const OMRController = require("../controllers/ormController");

// Endpoint to check OMR
router.post("/check-omr", OMRController.checkOMR);

module.exports = router;
