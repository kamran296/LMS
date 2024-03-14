import React, { useEffect } from "react";
import { useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function TeacherRegistration() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("authToken");
  console.log(token);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://lms-1-9sat.onrender.com/api/v1/teacher/create-teacher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        // Handle success, e.g., show a success message
        console.log("Teacher registered successfully:", data);
        setShowAlert(true);
        setMessage("Teacher Added Successfully!!");
        // alert("Teacher Added Successfully!!");
      } else {
        // Handle error, e.g., show an error message
        alert("All fields are mandatory ");
        console.error("Error registering teacher:", response.statusText);
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
        <div className="mainRegBox">
          <h1>Teacher Registration </h1>
          <div className="teacherregForm">
            <form onSubmit={handleSubmit}>
              <div className="inputFields">
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="nameInput"
                  label="Enter full name"
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
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="emailInput"
                  label="Enter Email Address"
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
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mobileInput"
                  label="Enter Mobile Number"
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
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="selectInput"
                  style={{
                    background: "white",
                    height: "3.3rem",
                    borderRadius: "8px",
                    width: "97%",
                    margin: "0.3rem",
                  }}
                >
                  <option>Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Form.Select>
              </div>

              <div className="btnBox">
                <Button id="teacherSubBtn" type="submit" variant="success">
                  SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Box>
  );
}
