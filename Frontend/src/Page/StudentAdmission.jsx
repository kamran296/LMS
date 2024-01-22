import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
export default function StudentAdmission() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const navigate = useNavigate();
  const [courseInterested, setcourseInterested] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    gender: "",
    dob: "",
    parentname: "",
    parentoccupation: "",
    parentphone: "",
    adharcard: "",
    mobile: "",
    address: "",
    education: {
      edu: "",
      year: "",
    },

    course: "",
  });

  const authToken = localStorage.getItem("authToken"); // Replace with your actual authToken
  const [courseSelected, setCourseSelected] = useState("");
  const fetchCourseId = async (courseName) => {
    try {
      const response = await fetch(
        `https://lms-backend-hl4h.onrender.com/api/v1/course/${courseName}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        const courseData = await response.json();
        console.log(courseData, 1234);
        setFormData((prevData) => ({
          ...prevData,
          course: {
            _id: courseData._id,
            coursename: courseData.coursename,
            desc: courseData.desc,
            duration: courseData.duration,
            fees: courseData.fees,
            // Add other course fields as needed
          },
        }));
        // setSelectedCourseId(data); // Assuming the course ID is stored in the "course_id" field
        // setFormData.course = data;
        // console.log(formData.course);
      } else {
        console.error("Error fetching course ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching course ID:", error);
    }
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "courseInterested") {
      const val = await fetchCourseId(value);
      console.log(value);
      setCourseSelected(val);
    }

    if (name.startsWith("education.")) {
      const educationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        education: {
          ...prevData.education,
          [educationField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [courseOptions, setCourseOptions] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://lms-backend-hl4h.onrender.com/api/v1/course/getallcourse",
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setCourseOptions(data.map((course) => course.coursename));
        } else {
          console.error("Error fetching courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "https://lms-backend-hl4h.onrender.com/api/v1/admissions/create-admission",
        formData, // Pass form data directly, axios will handle JSON.stringify
        {
          headers: {
            "Content-Type": "application/json",
            authToken: `${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        alert("Admission created successfully");
        // Optionally, you can reset the form or perform other actions after successful submission
      } else if (response.status === 400) {
        const errorData = response.data;
        console.error("Error: Student already exists", errorData.message);
        // Handle the case where the student already exists
      } else {
        console.error("Error creating admission:", response.statusText);
        // Handle other errors as needed
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <h1>Student Admission</h1>
        <div className="formBox">
          <form onSubmit={handleSubmit} className="stuAdmForm">
            <h3>Add Details</h3>
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  id="nameId"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  label="Enter full name"
                  type="text"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="emailId"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Enter Email Address"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="mobileId"
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  label="Enter Mobile Number"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
            <div className="radioField">
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{
                  background: "white",
                  height: "3rem",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </div>
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  name="parentname"
                  value={formData.parentname}
                  onChange={handleChange}
                  label="Enter Parents Name"
                  type="text"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  name="parentoccupation"
                  value={formData.parentoccupation}
                  onChange={handleChange}
                  label="Enter Parents Occupation"
                  type="text"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  type="number"
                  name="adharcard"
                  value={formData.adharcard}
                  onChange={handleChange}
                  label="Enter Aadhar number"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  type="text"
                  name="parentphone"
                  value={formData.parentphone}
                  onChange={handleChange}
                  label="Enter Parents Mobile"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div className="dobDiv">
              <h6
                style={{
                  margin: "0.5rem",
                }}
              >
                Date of Birth
              </h6>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{
                  height: "3rem",
                  background: "white",
                  borderRadius: "8px",
                  width: "60%",
                  margin: "0.5rem",
                }}
              />
            </div>
            <hr />
            <h3>Address & Education</h3>
            <div className="inputFields">
              <TextField
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                label="Enter your address"
                style={{
                  background: "white",
                  borderRadius: "8px",
                  width: "80%",
                }}
              />
            </div>
            <div className="inputFields">
              <TextField
                type="text"
                name="education.edu"
                value={formData.education.edu}
                onChange={handleChange}
                label="Enter your educational details"
                style={{
                  background: "white",
                  borderRadius: "8px",
                  width: "80%",
                }}
              />
            </div>
            <div className="inputFields">
              <TextField
                type="text"
                name="education.year"
                value={formData.education.year}
                onChange={handleChange}
                label="Enter education year"
                style={{
                  background: "white",
                  borderRadius: "8px",
                  width: "80%",
                }}
              />
            </div>

            <hr />
            <h3>Course Details</h3>
            <div className="radioField">
              <Form.Select
                name="courseInterested"
                value={courseSelected}
                onChange={handleChange}
                style={{
                  background: "white",
                  height: "3.3rem",
                  borderRadius: "8px",
                  width: "60%",
                  margin: "0.3rem",
                }}
              >
                <option>Select Course Interested</option>
                {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="btnBox">
              <Button id="stuSubBtn" type="submit" variant="success">
                ADD COURSE
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Box>
  );
}
