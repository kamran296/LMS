const Student = require("../models/student");
const mongoose = require("mongoose");
// Controller to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const students = await Student.find()
      .populate({
        path: "applicationId",
        model: "Admission",
        populate: {
          path: "branch.course",
          model: "Course",
        },
      })
      .populate("batch")
      .skip(skip)
      .limit(limit);
    const totalCount = await Student.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const admissionsWithTotalCount = students.map((student) => ({
      ...student.toObject(),
      totalCount,
    }));
    const response = {
      students,
      totalPages,
      currentPage: page,
      totalCount,
    };

    res.json(response);
    // res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a student
// exports.createStudent = async (req, res) => {
//   try {
//     const existingStudent = await Student.findOne({
//       applicationId: req.body.applicationId,
//     });

//     if (existingStudent) {
//       return res.status(400).json("Student Already Exists");
//     }

//     const newStudent = new Student(req.body);
//     const savedStudent = await newStudent.save();
//     res.status(200).json({ Response: savedStudent });
//   } catch (err) {
//     console.log("error in creating student", err);
//     res.status(500).json({ message: err });
//   }
// };
// Controller to create a student
exports.createStudent = async (req, res) => {
  try {
    const existingStudent = await Student.findOne({
      applicationId: req.body.applicationId,
    });

    if (existingStudent) {
      return res.status(400).json("Student Already Exists");
    }

    // Find the maximum roll number from existing students
    const maxRollNoStudent = await Student.findOne().sort({ roll_no: -1 });
    let roll_no = 1; // Default roll number if no existing students

    if (maxRollNoStudent) {
      roll_no = maxRollNoStudent.roll_no + 1; // Increment the roll number
    }

    // Add roll_no to the student data
    const newStudentData = { ...req.body, roll_no };

    const newStudent = new Student(newStudentData);
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
    const student = await Student.findById(req.params.studentId)
      .populate("applicationId")
      .populate("batch");
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
    });

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

exports.addMarks = async (req, res) => {
  const marksData = req.body;
  console.log(marksData);
  try {
    // Extract the test name from marksData
    const { testName, ...marks } = marksData;

    // Iterate through the marks data
    for (const roll_no in marks) {
      if (marks.hasOwnProperty(roll_no)) {
        // Remove the double quotes from the roll number
        const cleanRollNo = roll_no.replace(/"/g, "");

        const mark = marks[roll_no]; // Get the mark for the current roll number

        // Find the student by roll number
        const student = await Student.findOne({ roll_no: cleanRollNo });

        if (!student) {
          console.log(`Student with roll number ${cleanRollNo} not found`);
          continue; // Continue with the next iteration
        }

        // Add marks to the student
        student.marks.push({ testName, marks: mark });

        // Save the updated student document
        await student.save();
      }
    }

    return res.status(200).json({ message: "Marks added successfully" });
  } catch (error) {
    console.error("Error adding marks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
