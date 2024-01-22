import React, { useEffect } from "react";
import { useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function Batch() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [batchName, setBatchName] = useState("");
  const [course, setCourse] = useState(null); // Store selected course object
  const [teacher, setTeacher] = useState(null); // Store selected teacher object
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }

    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-avhw.onrender.com/api/v1/course/getallcourse"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-avhw.onrender.com/api/v1/teacher/getallteachers"
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const findCourseByName = (courseName) => {
    return courses.find((c) => c.coursename === courseName);
  };

  const findTeacherByName = (teacherName) => {
    return teachers.find((t) => t.name === teacherName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedCourse = findCourseByName(course);
      const selectedTeacher = findTeacherByName(teacher);
      console.log(selectedTeacher);
      const response = await axios.post(
        "https://lms-backend-avhw.onrender.com/api/v1/batch/create-batch",
        {
          batchname: batchName,
          course: selectedCourse,
          teacher: selectedTeacher,
        },
        {
          headers: {
            authToken: `${token}`,
          },
        }
      );
      console.log("Batch created successfully:", response.data);
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <h1>Batch Section</h1>
        <div className="batchForm">
          <h3>Create Batch according to course</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputFields">
              <TextField
                type="text"
                className="nameInput"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                label="Enter batch name"
                style={{
                  background: "white",
                  height: "3.3rem",
                  borderRadius: "8px",
                  width: "95%",
                  margin: "0.3rem",
                }}
              />
            </div>

            <div className="radioField">
              <Form.Select
                className="selectInput"
                value={course ? course.coursename : ""}
                onChange={(e) => setCourse(e.target.value)}
                style={{
                  background: "white",
                  height: "3.3rem",
                  borderRadius: "8px",
                  width: "97%",
                  margin: "0.3rem",
                }}
              >
                <option>Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.coursename}>
                    {course.coursename}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="radioField">
              <Form.Select
                className="selectInput"
                value={teacher ? teacher.name : ""}
                onChange={(e) => setTeacher(e.target.value)}
                style={{
                  background: "white",
                  height: "3.3rem",
                  borderRadius: "8px",
                  width: "97%",
                  margin: "0.3rem",
                }}
              >
                <option>Assigned Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="btnBox">
              <Button id="BatchBtn" type="submit" variant="success">
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Box>
  );
}
