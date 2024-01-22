import React, { useEffect } from "react";
import { useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
export default function BatchList() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [batchesData, setBatchesData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("authToken")) {
          navigate("/");
        }
        const response = await fetch(
          "https://lms-backend-avhw.onrender.com/api/v1/batch/getallbatches"
        );
        const data = await response.json();

        // Fetch teacher details for each batch
        const batchesWithTeacherDetails = await Promise.all(
          data.map(async (batch) => {
            const teacherResponse = await fetch(
              `https://lms-backend-avhw.onrender.com/api/v1/teacher/getteacher/${batch.teacher}`
            );
            const teacherData = await teacherResponse.json();
            return {
              ...batch,
              teacher: teacherData, // Replace teacher ID with teacher details
            };
          })
        );

        setBatchesData(batchesWithTeacherDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <h1>Batch List Section</h1>
        <MDBTable className="batchTable">
          <MDBTableHead>
            <tr>
              <th scope="col">Batch Name</th>
              <th scope="col">Course Name</th>
              <th scope="col">Assigned Teacher</th>
              <th scope="col">Edit</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {batchesData.map((item, index) => (
              <tr key={index}>
                <td>{item.batchname}</td>
                <td>{item.course && item.course.coursename}</td>
                <td>{item.teacher && item.teacher.name}</td>
                <td>
                  <Button variant="success">Edit</Button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Box>
    </Box>
  );
}
