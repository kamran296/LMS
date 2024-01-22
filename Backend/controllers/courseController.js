const Course = require("../models/course");

// Controller to get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new course
exports.createCourse = async (req, res) => {
  const { coursename, desc, duration, fees } = req.body;

  try {
    const courseExist = await Course.find({ coursename });
    if (courseExist.length > 0) {
      return res.status(400).json("course already exits");
    }
    const newCourse = new Course({ coursename, desc, duration, fees });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update a course
exports.updateCourse = async (req, res) => {
  const updateFields = req.body;
  const { courseId } = req.params;

  try {
    const course = await Course.findByIdAndUpdate(courseId, updateFields, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a course
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get course details by name
exports.getCourseByName = async (req, res) => {
  const { courseName } = req.params;
  try {
    // Find the course by name
    const course = await Course.findOne({ coursename: courseName });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.log("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
