import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import Button from "react-bootstrap/Button";
import { TextField } from "@mui/material";

export default function StudentDetail() {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lms-1-9sat.onrender.com/api/v1/student/getallstudents?page=${currentPage}&limit=3`
        // `http://localhost:8000/api/v1/student/getallstudents?page=${currentPage}&limit=10`
      );
      const data = await response.data;
      setData(data.students);
      console.log(data.totalCount, "length");
      const totalPages = Math.ceil(data.totalCount / 10);

      setTotalPages(totalPages);
      console.log("Data represented successfully", data.students);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewButtonClick = (studentId) => {
    // Navigate to the StudentView page and pass studentId as part of the URL
    navigate(`/studentview/${studentId}`);
  };
  const [search, setSearch] = useState("");
  const handlePageClick = (page) => {
    setCurrentPage(page);
    console.log(currentPage);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <h1>All Students </h1>
        <div className="inputFields">
          <TextField
            style={{ width: "50%", backgroundColor: "#fff1f1" }}
            onChange={(e) => setSearch(e.target.value)}
            label="🔍Search"
            type="text"
            fullWidth
          />
        </div>

        <div className="">
          <MDBTable className="studentDetailTable">
            <MDBTableHead>
              <tr>
                <th>Sr No</th>
                <th>Roll No</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                {/* <th scope="col">Parent Phone</th> */}
                <th scope="col">Phone No</th>
                <th scope="col">Course Name</th>

                <th scope="col">Batch</th>
                {/* <th scope="col">View</th> */}
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {/* {data
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.applicationId.personalInfo.firstName
                        .toLowerCase()
                        .includes(search);
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.roll_no} </td>
                    <td
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => handleViewButtonClick(item._id)}
                    >
                      {item.applicationId.personalInfo.firstName}{" "}
                      {item.applicationId.personalInfo.middleName}{" "}
                      {item.applicationId.personalInfo.lastName}
                    </td>

                    <td>{item.applicationId.personalInfo.email}</td>
                    <td>{item.applicationId.parent.phone}</td>
                    <td>{item.applicationId.branch.course.coursename}</td>
                    <td>{item.batch.batchname}</td>
                  </tr>
                ))} */}
              {data &&
                data
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.applicationId.personalInfo.firstName
                          .toLowerCase()
                          .includes(search);
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.roll_no} </td>
                      <td
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => handleViewButtonClick(item._id)}
                      >
                        {item.applicationId.personalInfo.firstName}{" "}
                        {item.applicationId.personalInfo.middleName}{" "}
                        {item.applicationId.personalInfo.lastName}
                      </td>
                      <td>{item.applicationId.personalInfo.email}</td>
                      <td>{item.applicationId.parent.phone}</td>
                      <td>{item.applicationId.branch.course.coursename}</td>
                      <td>{item.batch.batchname}</td>
                      {/* Render marks for each student */}
                      <td>
                        {item.marks.map((mark, index) => (
                          <div key={index}>
                            Test {index + 1}:{" "}
                            {parseFloat(mark.marks.replace(/"/g, ""))}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
            </MDBTableBody>
          </MDBTable>
          {/* Pagination buttons */}
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                style={{ marginLeft: "5px" }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
}
