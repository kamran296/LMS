const Admission = require("../models/admissionForm");

// Controller to get all admissions
exports.getAllAdmissions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const admissions = await Admission.find()
      .populate({
        path: "branch",
        populate: {
          path: "course",
        },
      })
      .skip(skip)
      .limit(limit);

    const totalCount = await Admission.countDocuments();

    // Calculate the total number of pages based on the total count and limit per page
    const totalPages = Math.ceil(totalCount / limit);
    const admissionsWithTotalCount = admissions.map((admission) => ({
      ...admission.toObject(),
      totalCount,
    }));
    const response = {
      admissions,
      totalPages,
      currentPage: page,
      totalCount,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific admission by ID
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.admissionId);
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

    // Find the last admission entry to get the last registration number
    const lastAdmission = await Admission.findOne(
      {},
      {},
      { sort: { "branch.registerationNumber": -1 } }
    );

    // Increment the registration number
    let newRegistrationNumber = 1;
    if (lastAdmission) {
      newRegistrationNumber = lastAdmission.branch.registerationNumber + 1;
    }

    // Set the registration number in the request body
    req.body.branch.registerationNumber = newRegistrationNumber;

    // Create a new admission instance based on the updated request body
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
    );

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
