// const mongoose = require("mongoose");
// const Admission = require("./admissionForm");
// const studentSchema = new mongoose.Schema({
//   applicationId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admission",
//     required: true,
//   },
//   batch: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   roll_no: {
//     type: Number,
//     require: true,
//   },
//   fees: {
//     amount: {
//       type: Number,
//       required: true,
//     },
//     paidamount: {
//       type: Number,
//       required: true,
//     },

//     date: {
//       type: Date,

//     },

//     status: {
//       type: String,
//       required: true,
//       enum: ["Paid", "Partial", "unpaid"],
//     },
//     receiptImage: {
//       type: String, // You can also use Buffer type if you want to store the image as binary data
//     },
//   },
// });

// module.exports = mongoose.model("Student", studentSchema);

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
    enum: ["Paid", "Partial", "unpaid"],
  },
  image: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  applicationId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Object,
    // ref: "Admission",
    required: true,
  },
  batch: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Object,
    required: true,
  },
  roll_no: {
    type: Number,
    require: true,
    unique: true,
  },
  fees: [feeSchema],
});

module.exports = mongoose.model("Student", studentSchema);
