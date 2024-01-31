import React, { useEffect } from "react";
import { useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StudentIcon from "@mui/icons-material/Person";
import Button from "react-bootstrap/Button";

export default function Courses() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [courseData, setCourseData] = useState([]);
  const [token, setToken] = useState(""); // State to store the authentication token
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve the authentication token from localStorage
    // const storedToken = localStorage.getItem("authToken");
    // console.log(storedToken);
    // if (storedToken) {
    //   setToken(storedToken);
    // }
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }

    // Fetch course data from the API
    fetchCourses();
  }, []);
    const [search, setSearch] = useState("");
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-hl4h.onrender.com/api/v1/course/getallcourse"
        // {
        //   headers: {
        //     authToken: token, // Include the token in the request headers
        //   },
        // }
      );
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="headingFlex">
          <h1>Courses</h1>
          <Button
            style={{ backgroundColor: "#ff6636" }}
            onClick={() => {
              navigate("/createcourse");
            }}
          >
            <StudentIcon></StudentIcon>
            Add Course
          </Button>
        </div>
        <div className="inputFields">
          <TextField
            style={{ width: "50%", backgroundColor: "#fff1f1" }}
            onChange={(e) => setSearch(e.target.value)}
            label="🔍Search"
            type="text"
            fullWidth
          />
        </div>

        <MDBTable className="courseTable">
          <MDBTableHead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Fees</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            
            {courseData.map((course) => (
              <tr key={course._id}>
                <td>{course.coursename}</td>
                <td>{course.desc}</td>
                <td>{course.duration}</td>
                <td>{course.fees}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Box>
    </Box>
  );
}
