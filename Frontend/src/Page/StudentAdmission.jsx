// import React, { useEffect } from "react";
// import SideBar from "../Component/SideBar";
// import Box from "@mui/material/Box";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// export default function StudentAdmission() {
//   const { pathname } = useLocation();

//   // Automatically scrolls to top whenever pathname changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   const navigate = useNavigate();
//   const [courseInterested, setcourseInterested] = useState("");
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     gender: "",
//     dob: "",
//     parentname: "",
//     parentoccupation: "",
//     parentphone: "",
//     adharcard: "",
//     mobile: "",
//     address: "",
//     education: {
//       edu: "",
//       year: "",
//     },

//     course: "",
//   });

//   const authToken = localStorage.getItem("authToken"); // Replace with your actual authToken
//   const [courseSelected, setCourseSelected] = useState("");
//   const fetchCourseId = async (courseName) => {
//     try {
//       const response = await fetch(
//         `https://lms-backend-hl4h.onrender.com/api/v1/course/${courseName}`,
//         {
//           method: "GET",
//         }
//       );

//       if (response.status === 200) {
//         const courseData = await response.json();
//         console.log(courseData, 1234);
//         setFormData((prevData) => ({
//           ...prevData,
//           course: {
//             _id: courseData._id,
//             coursename: courseData.coursename,
//             desc: courseData.desc,
//             duration: courseData.duration,
//             fees: courseData.fees,
//             // Add other course fields as needed
//           },
//         }));
//         // setSelectedCourseId(data); // Assuming the course ID is stored in the "course_id" field
//         // setFormData.course = data;
//         // console.log(formData.course);
//       } else {
//         console.error("Error fetching course ID:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching course ID:", error);
//     }
//   };
//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     if (name === "courseInterested") {
//       const val = await fetchCourseId(value);
//       console.log(value);
//       setCourseSelected(val);
//     }

//     if (name.startsWith("education.")) {
//       const educationField = name.split(".")[1];
//       setFormData((prevData) => ({
//         ...prevData,
//         education: {
//           ...prevData.education,
//           [educationField]: value,
//         },
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const [courseOptions, setCourseOptions] = useState([]);
//   useEffect(() => {
//     if (!localStorage.getItem("authToken")) {
//       navigate("/");
//     }
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(
//           "https://lms-backend-hl4h.onrender.com/api/v1/course/getallcourse",
//           {
//             method: "GET",
//           }
//         );

//         if (response.status === 200) {
//           const data = await response.json();
//           setCourseOptions(data.map((course) => course.coursename));
//         } else {
//           console.error("Error fetching courses:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);

//     try {
//       const response = await axios.post(
//         "https://lms-backend-hl4h.onrender.com/api/v1/admissions/create-admission",
//         formData, // Pass form data directly, axios will handle JSON.stringify
//         {
//           headers: {
//             "Content-Type": "application/json",
//             authToken: `${authToken}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         const data = response.data;
//         alert("Admission created successfully");
//         // Optionally, you can reset the form or perform other actions after successful submission
//       } else if (response.status === 400) {
//         const errorData = response.data;
//         console.error("Error: Student already exists", errorData.message);
//         // Handle the case where the student already exists
//       } else {
//         console.error("Error creating admission:", response.statusText);
//         // Handle other errors as needed
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <h1>Student Admission</h1>
//         <div className="formBox">
//           <form onSubmit={handleSubmit} className="stuAdmForm">
//             <h3>Add Details</h3>
//             <div className="flexDiv">
//               <div className="inputFields">
//                 <TextField
//                   id="nameId"
//                   name="fullname"
//                   value={formData.fullname}
//                   onChange={handleChange}
//                   label="Enter full name"
//                   type="text"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                   }}
//                 />
//               </div>
//               <div className="inputFields">
//                 <TextField
//                   id="emailId"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   label="Enter Email Address"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                   }}
//                 />
//               </div>
//               <div className="inputFields">
//                 <TextField
//                   id="mobileId"
//                   type="number"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   label="Enter Mobile Number"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="radioField">
//               <Form.Select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 style={{
//                   background: "white",
//                   height: "3rem",
//                   borderRadius: "8px",
//                   width: "100%",
//                 }}
//               >
//                 <option>Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </Form.Select>
//             </div>
//             <div className="flexDiv">
//               <div className="inputFields">
//                 <TextField
//                   name="parentname"
//                   value={formData.parentname}
//                   onChange={handleChange}
//                   label="Enter Parents Name"
//                   type="text"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                   }}
//                 />
//               </div>
//               <div className="inputFields">
//                 <TextField
//                   name="parentoccupation"
//                   value={formData.parentoccupation}
//                   onChange={handleChange}
//                   label="Enter Parents Occupation"
//                   type="text"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="flexDiv">
//               <div className="inputFields">
//                 <TextField
//                   type="number"
//                   name="adharcard"
//                   value={formData.adharcard}
//                   onChange={handleChange}
//                   label="Enter Aadhar number"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                   }}
//                 />
//               </div>
//               <div className="inputFields">
//                 <TextField
//                   type="text"
//                   name="parentphone"
//                   value={formData.parentphone}
//                   onChange={handleChange}
//                   label="Enter Parents Mobile"
//                   style={{
//                     background: "white",
//                     borderRadius: "8px",
//                     width: "100%",
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="dobDiv">
//               <h6
//                 style={{
//                   margin: "0.5rem",
//                 }}
//               >
//                 Date of Birth
//               </h6>
//               <Form.Control
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 style={{
//                   height: "3rem",
//                   background: "white",
//                   borderRadius: "8px",
//                   width: "60%",
//                   margin: "0.5rem",
//                 }}
//               />
//             </div>
//             <hr />
//             <h3>Address & Education</h3>
//             <div className="inputFields">
//               <TextField
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 label="Enter your address"
//                 style={{
//                   background: "white",
//                   borderRadius: "8px",
//                   width: "80%",
//                 }}
//               />
//             </div>
//             <div className="inputFields">
//               <TextField
//                 type="text"
//                 name="education.edu"
//                 value={formData.education.edu}
//                 onChange={handleChange}
//                 label="Enter your educational details"
//                 style={{
//                   background: "white",
//                   borderRadius: "8px",
//                   width: "80%",
//                 }}
//               />
//             </div>
//             <div className="inputFields">
//               <TextField
//                 type="text"
//                 name="education.year"
//                 value={formData.education.year}
//                 onChange={handleChange}
//                 label="Enter education year"
//                 style={{
//                   background: "white",
//                   borderRadius: "8px",
//                   width: "80%",
//                 }}
//               />
//             </div>

//             <hr />
//             <h3>Course Details</h3>
//             <div className="radioField">
//               <Form.Select
//                 name="courseInterested"
//                 value={courseSelected}
//                 onChange={handleChange}
//                 style={{
//                   background: "white",
//                   height: "3.3rem",
//                   borderRadius: "8px",
//                   width: "60%",
//                   margin: "0.3rem",
//                 }}
//               >
//                 <option>Select Course Interested</option>
//                 {courseOptions.map((course, index) => (
//                   <option key={index} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </Form.Select>
//             </div>

//             <div className="btnBox">
//               <Button id="stuSubBtn" type="submit" variant="success">
//                 ADD COURSE
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Box>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
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

    try {
      const response = await axios.post(
        "https://lms-backend-hl4h.onrender.com/api/v1/admissions/create-admission",
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
            {/* Branch Details */}
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  id="branchName"
                  name="branch.branchName"
                  value={formData.branch.branchName}
                  onChange={handleChange}
                  label="Enter Branch Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="registrationNumber"
                  name="branch.registerationNumber"
                  value={formData.branch.registerationNumber}
                  onChange={handleChange}
                  label="Enter Registration Number"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="radioField">
                <Form.Select
                  name="courseInterested"
                  value={formData.branch.course}
                  onChange={handleCourseChange}
                  fullWidth
                >
                  <option>Select Course Interested</option>
                  {courseOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            {/* Personal Information */}
            <h3>Personal Information</h3>
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  id="firstName"
                  name="personalInfo.firstName"
                  value={formData.personalInfo.firstName}
                  onChange={handleChange}
                  label="First Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="middleName"
                  name="personalInfo.middleName"
                  value={formData.personalInfo.middleName}
                  onChange={handleChange}
                  label="Middle Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="lastName"
                  name="personalInfo.lastName"
                  value={formData.personalInfo.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="gender"
                  name="personalInfo.gender"
                  value={formData.personalInfo.gender}
                  onChange={handleChange}
                  label="Gender"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="dob"
                  name="personalInfo.dob"
                  value={formData.personalInfo.dob}
                  onChange={handleChange}
                  label="Date of Birth"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="category"
                  name="personalInfo.category"
                  value={formData.personalInfo.category}
                  onChange={handleChange}
                  label="Category"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="phone"
                  name="personalInfo.phone"
                  value={formData.personalInfo.phone}
                  onChange={handleChange}
                  label="Phone"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="email"
                  name="personalInfo.email"
                  value={formData.personalInfo.email}
                  onChange={handleChange}
                  label="Email"
                  type="email"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="asharcard"
                  name="personalInfo.adharcard"
                  value={formData.personalInfo.adharcard}
                  onChange={handleChange}
                  label="Adharcard"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="pan"
                  name="personalInfo.pan"
                  value={formData.personalInfo.pan}
                  onChange={handleChange}
                  label="PAN"
                  type="text"
                  fullWidth
                />
              </div>
              {/* Add other personal information fields similarly */}
            </div>
            {/* Parent Information */}
            <h3>Parent Information</h3>
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  id="relation"
                  name="parent.relation"
                  value={formData.parent.relation}
                  onChange={handleChange}
                  label="Relation"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="firstName"
                  name="parent.firstName"
                  value={formData.parent.firstName}
                  onChange={handleChange}
                  label="First Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="lastName"
                  name="parent.lastName"
                  value={formData.parent.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="email"
                  name="parent.email"
                  value={formData.parent.email}
                  onChange={handleChange}
                  label="Email"
                  type="email"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="lastName"
                  name="parent.phone"
                  value={formData.parent.phone}
                  onChange={handleChange}
                  label="Phone"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="occupation"
                  name="parent.occupation"
                  value={formData.parent.occupation}
                  onChange={handleChange}
                  label="occupation"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="address"
                  name="parent.address"
                  value={formData.parent.address}
                  onChange={handleChange}
                  label="address"
                  type="text"
                  fullWidth
                />
              </div>

              {/* Add other parent information fields similarly */}
            </div>
            {/* Education Details */}
            <h3>Education Details </h3>
            <div className="flexDiv">
              <div className="inputFields">
                <TextField
                  id="sscDegree"
                  name="education.ssc.degree"
                  value={formData.education.ssc.degree}
                  onChange={handleEduChange}
                  label="SSC Degree"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="sscPercentage"
                  name="education.ssc.percentage"
                  value={formData.education.ssc.percentage}
                  onChange={handleEduChange}
                  label="SSC Percentage"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="sscYearOfPass"
                  name="education.ssc.yearOfPass"
                  value={formData.education.ssc.yearOfPass}
                  onChange={handleEduChange}
                  label="SSC yearOfPass"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="sscUniversity"
                  name="education.ssc.university"
                  value={formData.education.ssc.university}
                  onChange={handleEduChange}
                  label="SSC university"
                  type="text"
                  fullWidth
                />
              </div>

              <div className="inputFields">
                <TextField
                  id="hscDegree"
                  name="education.hsc.degree"
                  value={formData.education.hsc.degree}
                  onChange={handleEduChange}
                  label="HSC degree"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="hscPercentage"
                  name="education.hsc.percentage"
                  value={formData.education.hsc.percentage}
                  onChange={handleEduChange}
                  label="HSC percentage"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="hscYearOfPass"
                  name="education.hsc.yearOfPass"
                  value={formData.education.hsc.yearOfPass}
                  onChange={handleEduChange}
                  label="HSC yearOfPass"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="hscUniversity"
                  name="education.hsc.university"
                  value={formData.education.hsc.university}
                  onChange={handleEduChange}
                  label="HSC university"
                  type="text"
                  fullWidth
                />
              </div>

              <div className="inputFields">
                <TextField
                  id="graduationDegree"
                  name="education.graduation.degree"
                  value={formData.education.graduation.degree}
                  onChange={handleEduChange}
                  label="Graduation degree"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="graduationPercentage"
                  name="education.graduation.percentage"
                  value={formData.education.graduation.percentage}
                  onChange={handleEduChange}
                  label="Graduation percentage"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="graduationYearOfPass"
                  name="education.graduation.yearOfPass"
                  value={formData.education.graduation.yearOfPass}
                  onChange={handleEduChange}
                  label="Graduation yearOfPass"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="graduationSubject"
                  name="education.graduation.subject"
                  value={formData.education.graduation.subject}
                  onChange={handleEduChange}
                  label="Graduation subject"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="graduationUniversity"
                  name="education.graduation.university"
                  value={formData.education.graduation.university}
                  onChange={handleEduChange}
                  label="Graduation university"
                  type="text"
                  fullWidth
                />
              </div>

              <div className="inputFields">
                <TextField
                  id="postGraduationDegree"
                  name="education.postGraduation.degree"
                  value={formData.education.postGraduation.degree}
                  onChange={handleEduChange}
                  label="Post-Graduation degree"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="postGraduationPercentage"
                  name="education.postGraduation.percentage"
                  value={formData.education.postGraduation.percentage}
                  onChange={handleEduChange}
                  label="Post-Graduation percentage"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="postGraduationYearOfPass"
                  name="education.postGraduation.yearOfPass"
                  value={formData.education.postGraduation.yearOfPass}
                  onChange={handleEduChange}
                  label="Post-Graduation yearOfPass"
                  type="Number"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="postGraduationSubject"
                  name="education.postGraduation.subject"
                  value={formData.education.postGraduation.subject}
                  onChange={handleEduChange}
                  label="Post-Graduation subject"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="inputFields">
                <TextField
                  id="postGraduationUniversity"
                  name="education.postGraduation.university"
                  value={formData.education.postGraduation.university}
                  onChange={handleEduChange}
                  label="Post-Graduation university"
                  type="text"
                  fullWidth
                />
              </div>

              {/* Add other education details fields similarly */}
            </div>
            {/* Other Details */}
            <div className="inputFields">
              <TextField
                id="otherQualification"
                name="education.otherQualification"
                value={formData.education.otherQualification}
                onChange={handleChange}
                label="Other Qualification"
                type="text"
                fullWidth
              />
            </div>

            <div className="inputFields">
              <TextField
                id="hobbies"
                name="education.hobbies"
                value={formData.education.hobbies}
                onChange={handleChange}
                label="Hobbies"
                type="text"
                fullWidth
              />
            </div>
            <hr />
            {/* Course Details */}

            {/* Submission Button */}
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
