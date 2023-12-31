const mongoose = require("mongoose"); // Erase if already required

var AdmissionSchema = new mongoose.Schema(
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    status: {
      type: String,
      enum: ["Admitted", "Admit"],
      default: "Admit",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Admission", AdmissionSchema);
