import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import StudentIcon from "@mui/icons-material/Person";
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { TextField } from "@mui/material";
import StudentAdmitModal from "./StudentAdmitModal";
export default function AdmissionStatus() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [admissionsData, setAdmissionsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [currApplicationId, setCurrApplicationId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lms-backend-avhw.onrender.com/api/v1/admissions/getalladmissions"
        );
        const data = await response.json();
        console.log(data, 123);
        setAdmissionsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdmitButtonClick = (studentId) => {
    console.log(studentId);
    setSelectedStudentId(studentId);
    setShowModal(true);
    setCurrApplicationId(studentId);
    console.log(currApplicationId, 1234);
  };

  const handleAdmit = async ({ fees }) => {
    // Implement logic to send data to API
    console.log("Admit student with ID:", selectedStudentId, "Fees:", fees);

    // Close the modal
    setShowModal(false);
    setSelectedStudentId(null);
  };
  const [search, setSearch] = useState("");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <div className="headingFlex">
            <h1>All Enquries </h1>

            <Button
              style={{ backgroundColor: "#ff6636" }}
              onClick={() => {
                navigate("/studentadmission");
              }}
            >
              <StudentIcon></StudentIcon>
              Add Student Enquiry
            </Button>
          </div>
          <div className="inputFields">
            <TextField
              style={{ width: "50%", backgroundColor: "#fff1f1" }}
              id="dob"
              name="personalInfo.dob"
              onChange={(e) => setSearch(e.target.value)}
              label="🔍Search"
              type="text"
              fullWidth
            />
          </div>
          <div>
            <MDBTable className="admissionStatusTable">
              <MDBTableHead>
                <tr>
                  <th>Sr No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email id</th>

                  <th scope="col">Phone No</th>

                  <th scope="col">Course Name</th>

                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {admissionsData
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.personalInfo.firstName
                          .toLowerCase()
                          .includes(search);
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>
                        {item.personalInfo.firstName}{" "}
                        {item.personalInfo.middleName}{" "}
                        {item.personalInfo.lastName}
                      </td>
                      <td>{item.personalInfo.email}</td>

                      {/* <td>{item.parentphone}</td> */}

                      <td>{item.personalInfo.phone}</td>

                      <td>{item.branch.course}</td>

                      <td>
                        <Button
                          variant="success"
                          onClick={() => handleAdmitButtonClick(item._id)}
                          disabled={item.status === "Admitted"}
                          style={{
                            backgroundColor:
                              item.status === "Admitted"
                                ? "#ff6636"
                                : "#1F263E",
                            cursor:
                              item.status === "Admitted"
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {item.status === "Admitted" ? "COMPLETED" : "PENDING"}
                        </Button>
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </Box>
      </Box>
      {/* Render the Modal component */}
      <StudentAdmitModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAdmit={handleAdmit}
        applicationId={currApplicationId}
      />
    </>
  );
}
