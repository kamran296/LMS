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
          "https://lms-backend-hl4h.onrender.com/api/v1/admissions/getalladmissions"
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
          <div>
            <MDBTable className="admissionStatusTable">
              <MDBTableHead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>

                  <th scope="col">Mobile</th>

                  <th scope="col">Course Name</th>

                  <th scope="col">Parent phone</th>
                  <th scope="col">Admit</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {admissionsData.map((item, index) => (
                  <tr key={index}>
                    {/* {item.education &&
                      Object.values(item.education).map((value, subIndex) => (
                        <td key={subIndex}>{value}</td>
                      ))} */}
                    <td>
                      {item.personalInfo.firstName}{" "}
                      {item.personalInfo.middleName}{" "}
                      {item.personalInfo.lastName}
                    </td>
                    <td>{item.personalInfo.email}</td>

                    {/* <td>{item.parentphone}</td> */}

                    <td>{item.personalInfo.phone}</td>

                    <td>{item.branch.course}</td>

                    <td>{item.parent.phone}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleAdmitButtonClick(item._id)}
                        disabled={item.status === "Admitted"}
                        style={{
                          backgroundColor:
                            item.status === "Admitted" ? "green" : "red",
                          cursor:
                            item.status === "Admitted"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {item.status === "Admitted" ? "Admitted" : "Admit"}
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
