const mongoose = require("mongoose");

const enquirySchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    parentname: {
      type: String,
    },
    parentoccupation: {
      type: String,
    },
    parentphone: {
      type: String,
    },
    adharcard: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    education: {
      edu: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
