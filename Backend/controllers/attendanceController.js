const Attendance = require("../models/attendance");

// Controller to get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate({
        path: "batch",
        populate: { path: "course" },
      })
      .populate("records.student");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get attendance records for a specific batch and date
exports.getAttendanceByBatchAndDate = async (req, res) => {
  const { batchId, date } = req.params;

  try {
    const attendance = await Attendance.findOne({ batch: batchId, date })
      .populate({
        path: "batch",
        populate: { path: "course" },
      })
      .populate("records.student");

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to mark attendance for a batch on a specific date
exports.markAttendance = async (req, res) => {
  const { batchId, date, records } = req.body;

  try {
    let attendance = await Attendance.findOne({ batch: batchId, date });

    if (attendance) {
      // Attendance record already exists for the given batch and date
      return res.status(400).json({
        message:
          "Attendance record already exists for the given batch and date",
      });
    }

    attendance = new Attendance({ batch: batchId, date, records });
    await attendance.save();

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update attendance records for a batch on a specific date
exports.updateAttendance = async (req, res) => {
  const { batchId, date, records } = req.body;

  try {
    let attendance = await Attendance.findOne({ batch: batchId, date });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    attendance.records = records;
    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete attendance records for a batch on a specific date
exports.deleteAttendance = async (req, res) => {
  const { batchId, date } = req.params;

  try {
    const attendance = await Attendance.findOneAndDelete({
      batch: batchId,
      date,
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Student = require("../models/student");

// Controller to get attendance records for all students
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate({
      path: "records.student",
      populate: { path: "applicationId" },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get attendance records for a specific student
exports.getStudentAttendance = async (req, res) => {
  const { studentId } = req.params;

  try {
    const studentAttendance = await Attendance.find({
      "records.student": studentId,
    }).populate({
      path: "records.student",
      populate: { path: "applicationId" },
    });

    res.json(studentAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get attendance records for a batch
exports.getAttendanceByBatch = async (req, res) => {
  const { batchId } = req.params;

  try {
    const attendance = await Attendance.find({ batch: batchId }).populate({
      path: "records.student",
      model: "Student",
    });

    if (!attendance) {
      console.log(attendance, 123);
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
