// import React from "react";
// import "./Batch.css";
// import Navbar from "../Navbar/Navbar";
// import SideBar from "../SideBar/SideBar";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// const Batch = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="mainBox">
//         <SideBar />
//         <div className="mainOmrBox">
//           <h1>Batch Section</h1>
//           <div className="formBox">
//             <h3>Create Batch according to course</h3>
//             <form>
//               <Form.Control
//                 type="text"
//                 className="nameInput"
//                 placeholder="Enter Batch Name"
//               />
//               <Form.Select className="selectInput">
//                 <option>Select Course</option>
//               </Form.Select>
//               <Form.Select className="selectInput">
//                 <option>Assigned Teacher</option>
//               </Form.Select>
//               <div className="btnBox">
//                 <Button type="submit" variant="success">
//                   SUBMIT
//                 </Button>
//                 <Button type="reset" variant="warning">
//                   RESET
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Batch;

// import React, { useState, useEffect } from "react";
// import "./Batch.css";
// import Navbar from "../Navbar/Navbar";
// import SideBar from "../SideBar/SideBar";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import axios from "axios";

// const Batch = () => {
//   const [batchName, setBatchName] = useState("");
//   const [course, setCourse] = useState("");
//   const [assignedTeacher, setAssignedTeacher] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [token, setToken] = useState(""); // State to store the authentication token

//   useEffect(() => {
//     // Retrieve the authentication token from localStorage
//     const storedToken = localStorage.getItem("authToken");
//     if (storedToken) {
//       setToken(storedToken);
//     }

//     // Fetch courses and teachers data from the API
//     fetchCourses();
//     fetchTeachers();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/course/getallcourse"
//       );
//       const data = await response.data;
//       console.log(data);
//       setCourses(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/teacher/getallteachers"
//       );
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Find the selected course and teacher objects based on their IDs
//     const selectedCourse = courses.find((c) => c.id === parseInt(course));
//     const selectedTeacher = teachers.find(
//       (t) => t.id === parseInt(assignedTeacher)
//     );

//     console.log(batchName, selectedCourse, selectedTeacher);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/batch/create-batch",
//         {
//           batchname: batchName,
//           course: selectedCourse,
//           teacher: selectedTeacher,
//         },
//         {
//           headers: {
//             authToken: `${token}`, // Include the token in the request headers
//           },
//         }
//       );
//       console.log("Batch created successfully:", response.data);
//       // Add any additional logic or UI updates upon successful batch creation
//     } catch (error) {
//       console.error("Error creating batch:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="mainBox">
//         <SideBar />
//         <div className="mainOmrBox">
//           <h1>Batch Section</h1>
//           <div className="formBox">
//             <h3>Create Batch according to course</h3>
//             <form onSubmit={handleSubmit}>
//               <Form.Control
//                 type="text"
//                 className="nameInput"
//                 placeholder="Enter Batch Name"
//                 value={batchName}
//                 onChange={(e) => setBatchName(e.target.value)}
//               />
//               <Form.Select
//                 className="selectInput"
//                 value={course}
//                 onChange={(e) => setCourse(e.target.value)}
//               >
//                 <option>Select Course</option>
//                 {courses.map((course) => (
//                   <option key={course.id} value={course.id}>
//                     {course.coursename}
//                   </option>
//                 ))}
//               </Form.Select>
//               <Form.Select
//                 className="selectInput"
//                 value={assignedTeacher}
//                 onChange={(e) => setAssignedTeacher(e.target.value)}
//               >
//                 <option>Assigned Teacher</option>
//                 {teachers.map((teacher) => (
//                   <option key={teacher.id} value={teacher.id}>
//                     {teacher.name}
//                   </option>
//                 ))}
//               </Form.Select>
//               <div className="btnBox">
//                 <Button type="submit" variant="success">
//                   SUBMIT
//                 </Button>
//                 <Button type="reset" variant="warning">
//                   RESET
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Batch;

import React, { useState, useEffect } from "react";
import "./Batch.css";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Batch = () => {
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
        "http://localhost:8000/api/v1/course/getallcourse"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/teacher/getallteachers"
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
        "http://localhost:8000/api/v1/batch/create-batch",
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
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainOmrBox">
          <h1>Batch Section</h1>
          <div className="formBox">
            <h3>Create Batch according to course</h3>
            <form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                className="nameInput"
                placeholder="Enter Batch Name"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
              <Form.Select
                className="selectInput"
                value={course ? course.coursename : ""}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.coursename}>
                    {course.coursename}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="selectInput"
                value={teacher ? teacher.name : ""}
                onChange={(e) => setTeacher(e.target.value)}
              >
                <option>Assigned Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </Form.Select>
              <div className="btnBox">
                <Button type="submit" variant="success">
                  SUBMIT
                </Button>
                <Button type="reset" variant="warning">
                  RESET
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Batch;
