import React, { useEffect, useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
export default function StudentAdmission() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken"); // Replace with your actual authToken
  const [formData, setFormData] = useState({
    branch: {
      branchName: "",
      registerationNumber: "",
      course: "", // Replace with the correct course ID
    },
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dob: "",
      category: "",
      phone: "",
      email: "",
      adharcard: "",
      pan: "",
    },
    parent: {
      relation: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      occupation: "",
      address: "",
    },
    education: {
      ssc: {
        degree: "",
        percentage: "",
        yearOfPass: "",
        university: "",
      },
      hsc: {
        degree: "",
        percentage: "",
        yearOfPass: "",
        university: "",
      },
      graduation: {
        degree: "",
        percentage: "",
        yearOfPass: "",
        subject: "",
        university: "",
      },
      postGraduation: {
        degree: "",
        percentage: "",
        yearOfPass: "",
        subject: "",
        university: "",
      },
      otherQualification: "",
      hobbies: "",
    },
  });

  const [courseOptions, setCourseOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://lms-1-9sat.onrender.com/api/v1/course/getallcourse",
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          // setCourseOptions(data.map((course) => course.coursename));
          setCourseOptions(
            data.map((course) => ({
              courseId: course._id,
              courseName: course.coursename,
            }))
          );
        } else {
          console.error("Error fetching courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEduChange = (e) => {
    const { name, value } = e.target;

    // Split the name into parts to handle nested objects
    const [section, subSection, property] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subSection]: {
          ...prevData[section][subSection],
          [property]: value,
        },
      },
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name into parts to handle nested objects
    const [subSection, property] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,

      [subSection]: {
        ...prevData[subSection],
        [property]: value,
      },
    }));
  };
  const handleCourseChange = (e) => {
    const { value } = e.target;
    console.log(value, 434);
    setFormData((prevData) => ({
      ...prevData,
      branch: {
        ...prevData.branch,
        course: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (formData.personalInfo.adharcard.length !== 12) {
      alert("Aadhar card number should be exactly 12 characters");
      return;
    }

    // Check phone number length
    if (formData.personalInfo.phone.length !== 10) {
      alert("Phone number should be exactly 10 digits");
      return;
    }
    if (formData.parent.phone.length !== 10) {
      alert("Phone number should be exactly 10 digits");
      return;
    }
    if (formData.branch.course === "Select Course Interested") {
      alert("Select a valid course");
      return;
    }
    if (formData.personalInfo.gender === "Select Gender") {
      alert("Select Gender");
      return;
    }
    if (formData.parent.relation === "Select Relation") {
      alert("Select Relation");
      return;
    }
    try {
      const response = await axios.post(
        "https://lms-1-9sat.onrender.com/api/v1/admissions/create-admission",
        // "http://localhost:8000/api/v1/admissions/create-admission",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authToken: `${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        setShowAlert(true);
        setMessage("Admission created successfully");
        // alert("Admission created successfully");
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
        {showAlert && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            onClose={() => setShowAlert(false)} // Close the alert when user clicks on close icon
          >
            {message}
          </Alert>
        )}
        <h1>Admission Form</h1>
        <div className="formBox">
          <form onSubmit={handleSubmit} className="">
            {/* Branch Details */}
            <div className="formDetailbox">
              <h3>Addmission at Branch</h3>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="branchName"
                  name="branch.branchName"
                  value={formData.branch.branchName}
                  onChange={handleChange}
                  label="Enter Branch Name"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="registrationNumber"
                  name="branch.registerationNumber"
                  value={formData.branch.registerationNumber}
                  onChange={handleChange}
                  label="Enter Registration Number"
                  type="text"
                  fullWidth
                />

                {/* <NativeSelect
                  size="small"
                  name="courseInterested"
                  value={formData.branch.course}
                  onChange={handleCourseChange}
                  fullWidth
                  style={{ width: "100%", margin: "0.5rem" }}
                >
                  <option>Select Course Interested</option>
                  {courseOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </NativeSelect> */}
                <NativeSelect
                  size="small"
                  name="courseInterested"
                  value={formData.branch.course}
                  onChange={handleCourseChange}
                  fullWidth
                  style={{ width: "100%", margin: "0.5rem" }}
                >
                  <option>Select Course Interested</option>
                  {courseOptions.map((course) => (
                    <option key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>

            {/* Personal Information */}
            <div className="formDetailbox">
              <h3>Personal Information</h3>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="firstName"
                  name="personalInfo.firstName"
                  value={formData.personalInfo.firstName}
                  onChange={handleChange}
                  label="First Name"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="middleName"
                  name="personalInfo.middleName"
                  value={formData.personalInfo.middleName}
                  onChange={handleChange}
                  label="Middle Name"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="lastName"
                  name="personalInfo.lastName"
                  value={formData.personalInfo.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="flexDiv">
                <NativeSelect
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="gender"
                  name="personalInfo.gender"
                  value={formData.personalInfo.gender}
                  onChange={handleChange}
                  label="Gender"
                  type="text"
                  fullWidth
                >
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </NativeSelect>
                {/* <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="gender"
                  name="personalInfo.gender"
                  value={formData.personalInfo.gender}
                  onChange={handleChange}
                  label="Gender"
                  type="text"
                  fullWidth
                /> */}
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="dob"
                  name="personalInfo.dob"
                  value={formData.personalInfo.dob}
                  onChange={handleChange}
                  label="Date of Birth"
                  type="date"
                  fullWidth
                />
                <NativeSelect
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="category"
                  name="personalInfo.category"
                  value={formData.personalInfo.category}
                  onChange={handleChange}
                  label="Category"
                  type="text"
                  fullWidth
                >
                  <option>Select Category</option>
                  <option>SC</option>
                  <option>ST</option>
                  <option>OBC</option>
                  <option>OPEN</option>
                </NativeSelect>
                {/* <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="category"
                  name="personalInfo.category"
                  value={formData.personalInfo.category}
                  onChange={handleChange}
                  label="Category"
                  type="text"
                  fullWidth
                /> */}
              </div>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="phone"
                  name="personalInfo.phone"
                  value={formData.personalInfo.phone}
                  onChange={handleChange}
                  label="Phone"
                  type="Number"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="email"
                  name="personalInfo.email"
                  value={formData.personalInfo.email}
                  onChange={handleChange}
                  label="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="asharcard"
                  name="personalInfo.adharcard"
                  value={formData.personalInfo.adharcard}
                  onChange={handleChange}
                  label="Adharcard"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem", width: "32%" }}
                  id="pan"
                  name="personalInfo.pan"
                  value={formData.personalInfo.pan}
                  onChange={handleChange}
                  label="PAN"
                  type="text"
                  fullWidth
                />

                {/* Add other personal information fields similarly */}
              </div>
            </div>
            {/* Parent Information */}
            <div className="formDetailbox">
              <h3>Parent Information</h3>

              <div className="flexDiv">
                <NativeSelect
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="relation"
                  name="parent.relation"
                  value={formData.parent.relation}
                  onChange={handleChange}
                  label="Relation"
                  type="text"
                  fullWidth
                >
                  <option>Select Relation</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Other</option>
                </NativeSelect>
                {/* <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="relation"
                  name="parent.relation"
                  value={formData.parent.relation}
                  onChange={handleChange}
                  label="Relation"
                  type="text"
                  fullWidth
                /> */}

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="firstName"
                  name="parent.firstName"
                  value={formData.parent.firstName}
                  onChange={handleChange}
                  label="First Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="lastName"
                  name="parent.lastName"
                  value={formData.parent.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="email"
                  name="parent.email"
                  value={formData.parent.email}
                  onChange={handleChange}
                  label="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="lastName"
                  name="parent.phone"
                  value={formData.parent.phone}
                  onChange={handleChange}
                  label="Phone"
                  type="Number"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="occupation"
                  name="parent.occupation"
                  value={formData.parent.occupation}
                  onChange={handleChange}
                  label="occupation"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem", width: "32%" }}
                  id="address"
                  name="parent.address"
                  value={formData.parent.address}
                  onChange={handleChange}
                  label="address"
                  type="text"
                  fullWidth
                />
              </div>
            </div>
            {/* Education Details */}
            <div className="formDetailbox">
              <h3>Education Details </h3>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="sscDegree"
                  name="education.ssc.degree"
                  value={formData.education.ssc.degree}
                  onChange={handleEduChange}
                  label="SSC Degree"
                  type="text"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="sscPercentage"
                  name="education.ssc.percentage"
                  value={formData.education.ssc.percentage}
                  onChange={handleEduChange}
                  label="SSC Percentage"
                  type="Number"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="sscYearOfPass"
                  name="education.ssc.yearOfPass"
                  value={formData.education.ssc.yearOfPass}
                  onChange={handleEduChange}
                  label="SSC yearOfPass"
                  type="Number"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="sscUniversity"
                  name="education.ssc.university"
                  value={formData.education.ssc.university}
                  onChange={handleEduChange}
                  label="SSC university"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="hscDegree"
                  name="education.hsc.degree"
                  value={formData.education.hsc.degree}
                  onChange={handleEduChange}
                  label="HSC degree"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="hscPercentage"
                  name="education.hsc.percentage"
                  value={formData.education.hsc.percentage}
                  onChange={handleEduChange}
                  label="HSC percentage"
                  inputProps={{ min: 0, max: 100 }}
                  type="Number"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="hscYearOfPass"
                  name="education.hsc.yearOfPass"
                  value={formData.education.hsc.yearOfPass}
                  onChange={handleEduChange}
                  label="HSC yearOfPass"
                  type="Number"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="hscUniversity"
                  name="education.hsc.university"
                  value={formData.education.hsc.university}
                  onChange={handleEduChange}
                  label="HSC university"
                  type="text"
                  fullWidth
                />
              </div>

              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="graduationDegree"
                  name="education.graduation.degree"
                  value={formData.education.graduation.degree}
                  onChange={handleEduChange}
                  label="Graduation degree"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="graduationPercentage"
                  name="education.graduation.percentage"
                  value={formData.education.graduation.percentage}
                  onChange={handleEduChange}
                  label="Graduation percentage"
                  inputProps={{ min: 0, max: 100 }}
                  type="Number"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="graduationYearOfPass"
                  name="education.graduation.yearOfPass"
                  value={formData.education.graduation.yearOfPass}
                  onChange={handleEduChange}
                  label="Graduation yearOfPass"
                  type="Number"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="graduationSubject"
                  name="education.graduation.subject"
                  value={formData.education.graduation.subject}
                  onChange={handleEduChange}
                  label="Graduation subject"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="graduationUniversity"
                  name="education.graduation.university"
                  value={formData.education.graduation.university}
                  onChange={handleEduChange}
                  label="Graduation university"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="postGraduationDegree"
                  name="education.postGraduation.degree"
                  value={formData.education.postGraduation.degree}
                  onChange={handleEduChange}
                  label="Post-Graduation degree"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="postGraduationPercentage"
                  name="education.postGraduation.percentage"
                  value={formData.education.postGraduation.percentage}
                  onChange={handleEduChange}
                  label="Post-Graduation percentage"
                  inputProps={{ min: 0, max: 100 }}
                  type="Number"
                  fullWidth
                />
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="postGraduationYearOfPass"
                  name="education.postGraduation.yearOfPass"
                  value={formData.education.postGraduation.yearOfPass}
                  onChange={handleEduChange}
                  label="Post-Graduation yearOfPass"
                  type="Number"
                  fullWidth
                />
              </div>

              <div className="flexDiv">
                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="postGraduationSubject"
                  name="education.postGraduation.subject"
                  value={formData.education.postGraduation.subject}
                  onChange={handleEduChange}
                  label="Post-Graduation subject"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="postGraduationUniversity"
                  name="education.postGraduation.university"
                  value={formData.education.postGraduation.university}
                  onChange={handleEduChange}
                  label="Post-Graduation university"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="otherQualification"
                  name="education.otherQualification"
                  value={formData.education.otherQualification}
                  onChange={handleChange}
                  label="Other Qualification"
                  type="text"
                  fullWidth
                />

                <TextField
                  size="small"
                  style={{ margin: "0.5rem" }}
                  id="hobbies"
                  name="education.hobbies"
                  value={formData.education.hobbies}
                  onChange={handleChange}
                  label="Hobbies"
                  type="text"
                  fullWidth
                />
              </div>
            </div>

            <div className="btnBox">
              <Button id="stuSubBtn" type="submit" variant="success">
                ADD STUDENT
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </Box>
  );
}
