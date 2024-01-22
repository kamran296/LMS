const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const loginData = require("../middleware/loginData");
// Routes for attendance
router.get(
  "/getallattendance",
  loginData,
  attendanceController.getAllAttendance
);
// router.get("/:batchId/:date", attendanceController.getAttendanceByBatchAndDate);
router.post("/mark-attendance", loginData, attendanceController.markAttendance);
router.put("/", loginData, attendanceController.updateAttendance);
router.delete(
  "/:batchId/:date",
  loginData,
  attendanceController.deleteAttendance
);
router.get("/:studentId", loginData, attendanceController.getStudentAttendance);
router.get(
  "/batch/:batchId",
  loginData,
  attendanceController.getAttendanceByBatch
);

module.exports = router;
