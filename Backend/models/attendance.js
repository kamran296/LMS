const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  date: {
    type: Date,
    required: true,
  },
  records: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      status: {
        type: Boolean,
        default: false, // 'Present' or 'Absent'
        required: true,
      },
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
