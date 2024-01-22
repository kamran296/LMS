const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const loginData = require("../middleware/loginData");
// Routes for courses
router.route("/getallcourse").get(courseController.getAllCourses);
// router.route("/:courseId").get(courseController.getCourseById);
router.route("/create-course").post(loginData, courseController.createCourse);
router.route("/:courseId").put(loginData, courseController.updateCourse);
router.route("/:courseId").delete(loginData, courseController.deleteCourse);
router.get("/:courseName", courseController.getCourseByName);

module.exports = router;
