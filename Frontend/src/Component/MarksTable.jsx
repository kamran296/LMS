import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { TextField } from "@mui/material";
function MarksTable({ csvData }) {
  const [data, setData] = useState([]);
  console.log(data);
  // const [formData, setFormData] = useState({});
  useEffect(() => {
    if (!csvData) return; // Ensure csvData is not null or undefined

    // Parse the CSV data
    const rows = csvData.split("\n").filter(Boolean); // Filter out empty lines
    if (rows.length < 2) return; // Ensure at least two rows (header and data)

    const headers = rows[0].split(","); // Get headers from the first row
    const parsedData = rows.slice(1).map((row) => {
      const rowData = row.split(",");
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = rowData[index] ? rowData[index].trim() : ""; // Handle empty cells
      });
      return obj;
    });
    setData(parsedData);
  }, [csvData]);
  const [testName, setTestName] = useState("");

  const handleAddToDatabase = async () => {
    const formData = {};
    // Construct formData with roll numbers and marks
    data.forEach((row) => {
      formData[row['"Roll_No"']] = row['"score"'];
    });

    // Add test name to formData
    formData.testName = testName;

    // Now you can send formData to your backend for further processing
    console.log(formData, 123);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/student/addmarks",
        formData
      );
      console.log(response.json);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Marks Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row['"Roll_No"']}</td>
              <td>{row['"score"']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action="">
        <TextField
          size="small"
          style={{ margin: "0.5rem" }}
          label="Enter Test Name"
          type="text"
          fullWidth
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
      </form>
      <Button
        style={{ backgroundColor: "#ff6636" }}
        onClick={handleAddToDatabase}
      >
        Add in Database
      </Button>
    </div>
  );
}

export default MarksTable;
