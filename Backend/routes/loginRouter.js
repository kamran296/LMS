const express = require("express");
const loginController = require("../controllers/loginController");
const router = express.Router();

router.route("/").post(loginController.login);
router.route("/createadmin").post(loginController.createAdmin);
module.exports = router;
