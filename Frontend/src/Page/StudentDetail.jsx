import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import SearchIcon from "@mui/icons-material/Search";

import Button from "react-bootstrap/Button";
import { TextField } from "@mui/material";

export default function StudentDetail() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currApplicationId, setCurrApplicationId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-hl4h.onrender.com/api/v1/student/getallstudents"
      );
      const data = await response.data;
      setData(data);
      console.log("Data represented successfully", data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdmitButtonClick = (applicationId) => {
  //   // Set the current applicationId when Admit button is clicked
  //   setCurrApplicationId(applicationId);
  //   setShowModal(true); // Show the modal
  // };

  const handleViewButtonClick = (studentId) => {
    // Navigate to the StudentView page and pass studentId as part of the URL
    navigate(`/studentview/${studentId}`);
  };
  const [search, setSearch] = useState("");
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <h1>All Students </h1>
        <div className="inputFields">
          <TextField
            id="dob"
            name="personalInfo.dob"
            // value={formData.personalInfo.dob}
            onChange={(e) => setSearch(e.target.value)}
            label="Search"
            type="text"
            fullWidth
          />
        </div>
        <div className="">
          <MDBTable className="studentDetailTable">
            <MDBTableHead>
              <tr>
                {/* {data.length > 0 &&
                  Object.keys(data[0].applicationId.education).map((key) => (
                    <th key={key} scope="col">
                      Education {key}
                    </th>
                  ))} */}
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                {/* <th scope="col">Parent Phone</th> */}
                <th scope="col">Mobile</th>
                <th scope="col">Course Name</th>

                <th scope="col">Batch</th>
                <th scope="col">View</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.applicationId.personalInfo.firstName
                        .toLowerCase()
                        .includes(search);
                })
                .map((item, index) => (
                  <tr key={index}>
                    {/* {item.applicationId.education &&
                    Object.values(item.applicationId.education).map(
                      (value, subIndex) => <td key={subIndex}>{value}</td>
                    )} */}
                    <td>
                      {item.applicationId.personalInfo.firstName}{" "}
                      {item.applicationId.personalInfo.middleName}{" "}
                      {item.applicationId.personalInfo.lastName}
                    </td>
                    <td>{item.applicationId.personalInfo.email}</td>
                    {/* <td>{item.applicationId.parentphone}</td> */}
                    <td>{item.applicationId.personalInfo.phone}</td>
                    <td>{item.applicationId.branch.course}</td>

                    <td>{item.batch.batchname}</td>
                    <td>
                      <Button
                        onClick={() => handleViewButtonClick(item._id)}
                        variant="success"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </Box>
    </Box>
  );
}
