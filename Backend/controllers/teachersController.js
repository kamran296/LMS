const Teacher = require("../models/teachers");
const validator = require("validator");
// Controller to get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new teacher
exports.createTeacher = async (req, res) => {
  const { name, email, mobile, gender } = req.body;

  try {
    const teacherExixts = await Teacher.find({ email });
    if (teacherExixts.length > 0) {
      return res.status(400).json("teacher already exits");
    }
    const newTeacher = new Teacher({ name, email, mobile, gender });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a teacher
exports.updateTeacher = async (req, res) => {
  const updateFields = req.body;
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findByIdAndUpdate(teacherId, updateFields, {
      new: true,
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a teacher
exports.deleteTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findByIdAndDelete(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTeacherByName = async (req, res) => {
  const { teacherName } = req.params;
  try {
    // Find the course by name
    const teacher = await Teacher.findOne({ name: teacherName });

    if (!teacher) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.log("Error fetching teacher:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
