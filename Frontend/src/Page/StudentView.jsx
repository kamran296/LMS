import React, { useEffect, useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
} from "mdb-react-ui-kit";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { NativeSelect } from "@mui/material";
import "./mainPage.css";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const StudentView = () => {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [basicActive, setBasicActive] = useState("tab1");
  const [studentDetails, setStudentDetails] = useState({});
  const [image, setImage] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    paidamount: "",
    date: "",
    status: "",
    image: "",
  });
  const { studentId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    fetchDetails();

    fetchAttendanceData();
  }, [studentId]);
  const authToken = localStorage.getItem("authToken");

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `https://lms-1-9sat.onrender.com/api/v1/attendance/${studentId}`,
        {
          headers: {
            authToken: authToken,
          },
        }
      );
      const data = await response.data;
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const fetchDetails = async (req, res) => {
    try {
      const response = await axios.get(
        `https://lms-1-9sat.onrender.com/api/v1/student/view/${studentId}`
        // `http://localhost:8000/api/v1/student/view/${studentId}`
      );
      const data = await response.data;
      setStudentDetails(data);
      console.log("data fetched succeessfully", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  const handleDownloadImage = (imageUrl, imageName) => {
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = imageName; // Set the download attribute to the image name
    anchor.click();
  };

  const handlePrintImage = (imageUrl) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
        </head>
        <body>
          <img src="${imageUrl}" style="max-width: 100%;" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  //   function for file upload to firebase
  const handleFileUpload = (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setImage(downloadUrl);
        });
      });
    } else {
      console.log("no file selected");
    }
  };
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setFormData((prevFormData) => ({
        ...prevFormData,
        image: image,
      }));
      const response = await axios.post(
        `https://lms-1-9sat.onrender.com/api/v1/student/addfees/${studentId}`,
        formData
      );
      setShowAlert(true);
      setMessage("student added successfully");
      // alert("fees added successfully");
      console.log(response.data);
      // Handle success, update UI, etc.
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <div className="studentViewBox">
          {showAlert && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              onClose={() => setShowAlert(false)} // Close the alert when user clicks on close icon
            >
              {message}
            </Alert>
          )}
          <MDBTabs pills className="mb-3 ">
            <MDBTabsItem>
              <MDBTabsLink
                id="tabId1"
                onClick={() => handleBasicClick("tab1")}
                active={basicActive === "tab1"}
              >
                Student Details
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              {/* <MDBTabsLink
                id="tabId2"
                onClick={() => handleBasicClick("tab2")}
                active={basicActive === "tab2"}
              >
                Update Fees
              </MDBTabsLink> */}
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane open={basicActive === "tab1"}>
              <MDBContainer
                breakpoint="lg"
                style={{ backgroundColor: "#fff1f1" }}
              >
                {Object.keys(studentDetails).length > 0 && (
                  <div>
                    <h3>Basic Details</h3>
                    <div>
                      <div className="flexViewBox">
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Full Name"
                          defaultValue={
                            studentDetails.applicationId.personalInfo.firstName
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Email"
                          defaultValue={
                            studentDetails.applicationId.personalInfo.email
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Mobile"
                          defaultValue={
                            studentDetails.applicationId.personalInfo.phone
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Gender"
                          defaultValue={
                            studentDetails.applicationId.personalInfo.gender
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </div>
                      <div className="">
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Aadhar Card"
                          defaultValue={
                            studentDetails.applicationId.personalInfo.adharcard
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Date of Birth"
                          defaultValue={
                            studentDetails.applicationId.personalInfo.dob
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Address"
                          defaultValue={
                            studentDetails.applicationId.parent.address
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                          multiline={4}
                        />
                      </div>
                    </div>
                    <hr />
                    <h3>Parents Details</h3>
                    <div className="">
                      <TextField
                        style={{ margin: "0.5rem" }}
                        size="small"
                        id="outlined-read-only-input"
                        label="Parent Name"
                        defaultValue={
                          studentDetails.applicationId.parent.firstName
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        style={{ margin: "0.5rem" }}
                        size="small"
                        id="outlined-read-only-input"
                        label="Parent Occupation"
                        defaultValue={
                          studentDetails.applicationId.parent.occupation
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        style={{ margin: "0.5rem" }}
                        size="small"
                        id="outlined-read-only-input"
                        label="Parent Phone"
                        defaultValue={studentDetails.applicationId.parent.phone}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>
                    <hr />
                    <h3>Fees Details</h3>
                    {studentDetails.fees.map((fee) => (
                      <div style={{ display: "flex" }} key={fee._id}>
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Amount"
                          defaultValue={fee.amount}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Amount"
                          defaultValue={fee.paidamount}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Date"
                          defaultValue={new Date(fee.date).toLocaleDateString()}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Status"
                          defaultValue={fee.status}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <div className="btnBox">
                          <Button
                            style={{
                              backgroundColor: "black",
                              margin: "0.3rem",
                            }}
                            onClick={() =>
                              handleDownloadImage(fee.image, "Receipt")
                            }
                          >
                            <DownloadIcon></DownloadIcon>
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "black",
                              margin: "0.3rem",
                            }}
                            onClick={() => handlePrintImage(fee.image)}
                          >
                            <LocalPrintshopIcon></LocalPrintshopIcon>
                          </Button>
                        </div>
                      </div>
                    ))}
                    <h3>Update Fees Details</h3>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Amount"
                          type="number"
                          className="amount"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          label="Paid Amount"
                          type="number"
                          className="paidamount"
                          value={formData.paidamount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              paidamount: e.target.value,
                            })
                          }
                        />
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          id="outlined-read-only-input"
                          type="date"
                          className="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <NativeSelect
                          style={{ margin: "0.5rem" }}
                          size="small"
                          label="Status"
                          type="text"
                          className="status"
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        >
                          <option>Select Status</option>
                          <option>Paid</option>
                          <option>Partial</option>
                          <option>Unpaid</option>
                        </NativeSelect>
                        <TextField
                          style={{ margin: "0.5rem" }}
                          size="small"
                          label="Status"
                          type="text"
                          className="status"
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        />
                        <MuiButton
                          style={{
                            margin: "0.5rem",
                            backgroundColor: "#ff6636",
                          }}
                          component="label"
                          variant="contained"
                          className="image"
                          name="image"
                          onChange={handleFileUpload}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload file
                          <VisuallyHiddenInput type="file" />
                        </MuiButton>
                      </div>
                      <div>
                        <MuiButton
                          style={{
                            margin: "0.5rem",
                            backgroundColor: "#ff6636",
                          }}
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </MuiButton>
                      </div>
                    </form>
                  </div>
                )}
              </MDBContainer>
            </MDBTabsPane>
            {/* <MDBTabsPane open={basicActive === "tab2"}>
              <MDBContainer>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />

                  <label htmlFor="paidamount">Paid amount</label>
                  <input
                    type="number"
                    className="paidamount"
                    value={formData.paidamount}
                    onChange={(e) =>
                      setFormData({ ...formData, paidamount: e.target.value })
                    }
                  />

                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />

                  <label htmlFor="status">Status</label>
                  <input
                    type="text"
                    className="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  />

                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    className="image"
                    name="image"
                    onChange={handleFileUpload}
                  />

                  <button type="submit">Submit</button>
                </form>
              </MDBContainer>
            </MDBTabsPane> */}
          </MDBTabsContent>
        </div>
      </Box>
    </>
  );
};

export default StudentView;
