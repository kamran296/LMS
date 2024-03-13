import React, { useState } from "react";
import SideBar from "../Component/SideBar";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (req, res) => {
    try {
      const response = await axios.post(
        "https://lms-1-9sat.onrender.com/api/v1/createadmin",
        // "http://localhost:8000/api/v1/login/createadmin",
        { username, password }
      );
      alert("New login created");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
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
