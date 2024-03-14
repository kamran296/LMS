import React, { useState } from "react";
import SideBar from "../Component/SideBar";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (req, res) => {
    try {
      const response = await axios.post(
        "https://lms-1-9sat.onrender.com/api/v1/login/createadmin",
        // "http://localhost:8000/api/v1/login/createadmin",
        { username, password }
      );

      if (response.status === 200) {
        setShowAlert(true);
        setMessage("New login created");
      }
      // alert("New login created");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
          <TextField
            size="small"
            style={{ margin: "1.5rem" }}
            id="branchName"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Enter Branch Name"
            type="text"
            fullWidth
          />

          <TextField
            size="small"
            style={{ margin: "1.5rem" }}
            id="branchName"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Enter Password"
            type="text"
            fullWidth
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Register!!
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewUser;
