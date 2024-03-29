import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
export default function CreateCourse() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [coursename, setCoursename] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");
  const [token, setToken] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const storesToken = localStorage.getItem("authToken");
    if (storesToken) {
      setToken(storesToken);
    }
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lms-1-9sat.onrender.com/api/v1/course/create-course",
        {
          coursename: coursename,
          desc: description,
          duration: duration,
          fees: fees,
        },
        {
          headers: {
            authToken: token,
          },
        }
      );
      if (response.status === 201) {
        setShowAlert(true);
        setMessage("course created successfully!!");
        // alert("course created successfully!!");
      } else {
        // Handle error, e.g., show an error message
        console.error("Error registering course:", response.statusText);
      }
      // Handle the response as needed (e.g., show success message, redirect, etc.)
      console.log("Course added successfully:", response.data);

      // Optionally reset the form fields
      setCoursename("");
      setDescription("");
      setDuration("");
      setFees("");
    } catch (err) {
      alert("All fields are mandatory");
      console.log(err);
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
        <div className="mainOmrBox">
          <h1>Course Registration Process</h1>
          <div className="createCourseForm">
            <form onSubmit={handleCreateCourse}>
              <div className="inputFields">
                <TextField
                  type="text"
                  className="nameInput"
                  value={coursename}
                  onChange={(e) => setCoursename(e.target.value)}
                  label="Enter Course Name"
                  style={{
                    background: "white",
                    height: "3.3rem",
                    borderRadius: "8px",
                    width: "95%",
                    margin: "0.3rem",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  type="text"
                  className="nameInput"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="Enter Course description"
                  style={{
                    background: "white",
                    height: "3.3rem",
                    borderRadius: "8px",
                    width: "95%",
                    margin: "0.3rem",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  type="text"
                  className="nameInput"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  label="Enter Course duration"
                  style={{
                    background: "white",
                    height: "3.3rem",
                    borderRadius: "8px",
                    width: "95%",
                    margin: "0.3rem",
                  }}
                />
              </div>
              <div className="inputFields">
                <TextField
                  type="number"
                  className="nameInput"
                  placeholder="Enter fees"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  label="Enter fees"
                  style={{
                    background: "white",
                    height: "3.3rem",
                    borderRadius: "8px",
                    width: "95%",
                    margin: "0.3rem",
                  }}
                />
              </div>

              <div className="btnBox">
                <Button id="addCourseBtn" type="submit" variant="success">
                  ADD COURSE
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Box>
  );
}
