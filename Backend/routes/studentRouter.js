const express = require("express");
const router = express.Router();
const studenController = require("../controllers/studentController");
router.route("/create-student").post(studenController.createStudent);
router.route("/getallstudents").get(studenController.getAllStudents);
router.route("/:studentid").put(studenController.updateStudent);
router.route(":/studentId").delete(studenController.deleteStudent);
router.route("/view/:studentId").get(studenController.getStudentById);
router.route("/addfees/:studentId").post(studenController.Addfees);

module.exports = router;
