const mongoose = require("mongoose");
const Admission = require("./admissionForm");

const feeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  paidamount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    enum: ["Paid", "Partial", "Unpaid"],
  },
  image: {
    type: String,
    required: true,
  },
});

const markSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    // type: Object,
    ref: "Admission",
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    // type: Object,
    ref: "Batch",
    required: true,
  },
  roll_no: {
    type: Number,
    required: true,
  },
  fees: [feeSchema],
  marks: [markSchema],
});

module.exports = mongoose.model("Student", studentSchema);
