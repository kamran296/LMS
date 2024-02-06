const mongoose = require("mongoose"); // Erase if already required

const BranchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  registerationNumber: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    ref: "Course",
  },
});

const PersonalSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["SC", "ST", "OBC", "OPEN"],
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  adharcard: {
    type: Number,
    required: true,
    unique: true,
  },
  pan: {
    type: String,
    required: true,
    unique: true,
  },
});

const ParentSchema = new mongoose.Schema({
  relation: {
    type: String,
    enum: ["Mother", "Father", "Other"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
});

const EducationalSchema = new mongoose.Schema({
  ssc: {
    degree: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    yearOfPass: {
      type: Number,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
  },
  hsc: {
    degree: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    yearOfPass: {
      type: Number,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
  },
  graduation: {
    degree: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    yearOfPass: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
  },
  postGraduation: {
    degree: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    yearOfPass: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
  },
  otherQualification: {
    type: String,
  },
  hobbies: {
    type: String,
    required: true,
  },
});
var AdmissionSchema = new mongoose.Schema(
  {
    branch: BranchSchema,
    personalInfo: PersonalSchema,
    parent: ParentSchema,
    education: EducationalSchema,
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
