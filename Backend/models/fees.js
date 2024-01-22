const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    admission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
      required: true,
    },
    amount: {
      tpye: Number,
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
  },
  { timestaps: true }
);

module.exports = mongoose.model("Fees", feeSchema);
