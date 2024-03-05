import React, { useState } from "react";
import axios from "axios";
import MarksTable from "../Component/MarksTable";
import SideBar from "../Component/SideBar";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Omr = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [csvData, setCsvData] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles) {
      alert("Please select files.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      // Send formData to your backend API
      const response = await fetch(
        "https://omrchecker-production.up.railway.app/upload",
        { method: "POST", body: formData }
      );

      if (response.ok) {
        // Handle success
        console.log("Files uploaded successfully");
        const data = await response.text();
        setCsvData(data);
      } else {
        // Handle error
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h3">OMR Evaluation</Typography>
        <form onSubmit={handleSubmit}>
          <input type="file" multiple onChange={handleFileChange} />
          <button type="submit">Upload Files</button>
        </form>

        {csvData && <MarksTable csvData={csvData} />}
      </Box>
    </Box>
  );
};

export default Omr;
