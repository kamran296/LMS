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
  try {
    // Check if a student with the provided Aadhar card already exists
    const studentExists = await Admission.findOne({
      "personalInfo.adharcard": req.body.personalInfo.adharcard,
    });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create a new admission instance based on the request body
    const newAdmission = new Admission(req.body);

    // Save the new admission to the database
    await newAdmission.save();

    // Respond with the newly created admission
    res.status(201).json(newAdmission);
  } catch (error) {
    // Handle errors
    console.error("Error creating admission:", error);
    res
      .status(500)
      .json({ message: "Failed to create admission", error: error.message });
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
