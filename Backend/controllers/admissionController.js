const Admission = require("../models/admissionForm");

// Controller to get all admissions
exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().populate("course");
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific admission by ID
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.admissionId).populate(
      "course"
    );
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new admission
exports.createAdmission = async (req, res) => {
  const {
    fullname,
    email,
    gender,
    dob,
    parentname,
    parentoccupation,
    parentphone,
    adharcard,
    mobile,
    address,
    education,
    course,
  } = req.body;

  try {
    const studentExists = await Admission.findOne({
      adharcard: { $regex: new RegExp(adharcard, "i") },
    });
    if (studentExists) {
      return res.status(400).json("Student already exists");
    }

    const newAdmission = new Admission({
      fullname,
      email,
      gender,
      dob,
      parentname,
      parentoccupation,
      parentphone,
      adharcard,
      mobile,
      address,
      education,
      course,
    });

    await newAdmission.save();
    res.status(201).json(newAdmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update an admission
exports.updateAdmission = async (req, res) => {
  const updateFields = req.body;
  const { admissionId } = req.params;

  try {
    const admission = await Admission.findByIdAndUpdate(
      admissionId,
      updateFields,
      { new: true }
    ).populate("course");

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an admission
exports.deleteAdmission = async (req, res) => {
  const { admissionId } = req.params;

  try {
    const admission = await Admission.findByIdAndDelete(admissionId);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
