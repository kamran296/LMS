const Student = require("../models/student");
const mongoose = require("mongoose");
// Controller to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a student
exports.createStudent = async (req, res) => {
  try {
    const existingStudent = await Student.findOne({
      applicationId: req.body.applicationId,
    });

    if (existingStudent) {
      return res.status(400).json("Student Already Exists");
    }

    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(200).json({ Response: savedStudent });
  } catch (err) {
    console.log("error in creating student", err);
    res.status(500).json({ message: err });
  }
};

// Controller to get a specific student by ID
exports.getStudentById = async (req, res) => {
  try {
    console.log(req.params);
    const student = await Student.findById(req.params.studentId).populate(
      "applicationId batch"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a student
exports.updateStudent = async (req, res) => {
  const updateFields = req.body;
  const { studentId } = req.params;

  try {
    console.log(updateFields);
    const student = await Student.findByIdAndUpdate(studentId, updateFields, {
      new: true,
    }).populate("applicationId batch");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a student
exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add fees of a student
exports.Addfees = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const { amount, paidamount, date, status, image } = req.body;
    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({ message: "Invalid studentId" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json("Student not found");
    }
    student.fees.push({
      amount,
      paidamount,
      date,
      status,
      image,
    });

    // Save the updated student object
    await student.save();

    return res
      .status(200)
      .json({ message: "Fees added successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
