const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teachersController");
const loginData = require("../middleware/loginData");
// Routes for teachers
router.get("/getallteachers", teacherController.getAllTeachers);
router.get("/getteacher/:teacherId", teacherController.getTeacherById);
router.post("/create-teacher", loginData, teacherController.createTeacher);
router.put("/:teacherId", loginData, teacherController.updateTeacher);
router.delete("/:teacherId", loginData, teacherController.deleteTeacher);
// router.get("/:teachername", teacherController.getTeacherByName);
module.exports = router;
