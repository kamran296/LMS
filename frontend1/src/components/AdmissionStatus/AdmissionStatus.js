// import React from "react";
// import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
// import SideBar from "../SideBar/SideBar";
// import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

// const DashboardContainer = styled.div`
//   display: flex;
// `;
// const StudentStatus = () => {
//   const jsonData = [
//     { id: 1, firstName: "Mark", lastName: "Otto", handle: "@mdo" },
//     { id: 2, firstName: "John", lastName: "Doe", handle: "@john_doe" },
//     // Add more data as needed
//   ];
//   return (
//     <>
//       <Navbar />
//       <DashboardContainer>
//         <SideBar />
//         <div className="mainOmrBox">
//           <h1>StudentStatus Section</h1>
//           <MDBTable>
//             <MDBTableHead>
//               <tr>
//                 {Object.keys(jsonData[0]).map((key) => (
//                   <th key={key} scope="col">
//                     {key}
//                   </th>
//                 ))}
//               </tr>
//             </MDBTableHead>
//             <MDBTableBody>
//               {jsonData.map((item, index) => (
//                 <tr key={index}>
//                   {Object.values(item).map((value, subIndex) => (
//                     <td key={subIndex}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </MDBTableBody>
//           </MDBTable>
//         </div>
//       </DashboardContainer>
//     </>
//   );
// };

// export default StudentStatus;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import StudentAdmitModal from "../studentModal.js/studentModal";
import { useNavigate } from "react-router-dom";
const DashboardContainer = styled.div`
  display: flex;
`;

const AdmissionStatus = () => {
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
          "http://localhost:8000/api/v1/admissions/getalladmissions"
        );
        const data = await response.json();
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
      <Navbar />
      <DashboardContainer>
        <SideBar />
        <div className="mainOmrBox">
          <h1>Student Status Section</h1>
          <MDBTable>
            <MDBTableHead>
              <tr>
                {admissionsData.length > 0 &&
                  Object.keys(admissionsData[0].education).map((key) => (
                    <th key={key} scope="col">
                      Education {key}
                    </th>
                  ))}
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>

                <th scope="col">Parent Phone</th>

                <th scope="col">Mobile</th>

                <th scope="col">Course Name</th>

                <th scope="col">Course Duration</th>
                <th scope="col">Course Fees</th>
                <th scope="col">Status</th>
                <th scope="col">Admit</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {admissionsData.map((item, index) => (
                <tr key={index}>
                  {item.education &&
                    Object.values(item.education).map((value, subIndex) => (
                      <td key={subIndex}>{value}</td>
                    ))}
                  <td>{item.fullname}</td>
                  <td>{item.email}</td>

                  <td>{item.parentphone}</td>

                  <td>{item.mobile}</td>

                  <td>{item.course && item.course.coursename}</td>

                  <td>{item.course && item.course.duration}</td>
                  <td>{item.course && item.course.fees}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
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
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </DashboardContainer>
      {/* Render the Modal component */}
      <StudentAdmitModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAdmit={handleAdmit}
        applicationId={currApplicationId}
      />
    </>
  );
};

export default AdmissionStatus;
