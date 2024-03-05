import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Button from "@mui/material/Button";

import NativeSelect from "@mui/material/NativeSelect";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
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
const StudentAdmitModal = ({
  show,
  handleClose,
  handleAdmit,
  applicationId,
}) => {
  const [batches, setBatches] = useState([]);
  const [status, setStatus] = useState("Admit");
  const [applicationData, setApplicationData] = useState({});
  const [batchData, setBatchData] = useState({});
  useEffect(() => {
    batchOptions();
    const ApplicationData = async (req, res) => {
      try {
        const response = await axios.get(
          `https://lms-backend-avhw.onrender.com/api/v1/admissions/${applicationId}`
        );
        const data = await response.data;
        // setApplicationData(data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          applicationId: data,
        }));
        console.log(data, 432);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    ApplicationData();
  }, [applicationId]);
  const batchOptions = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-avhw.onrender.com/api/v1/batch/getAllBatches"
      );
      const data = await response.data;
      console.log(data);
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const [formData, setFormData] = useState({
    applicationId: "",
    batch: "",
    roll_no: "",
    fees: [
      {
        amount: "",
        paidamount: "",
        date: "",
        status: "",
        image: "",
      },
    ],
  });

  // function for saving batch data in the student
  const BatchData = async (selectedBatchId) => {
    const response = await axios.get(
      `https://lms-backend-avhw.onrender.com/api/v1/batch/${selectedBatchId}`
    );
    const data = await response.data;
    setBatchData(data);
    // setFormData({ ...formData, batch: batchData });

    setFormData((prevFormData) => ({
      ...prevFormData,
      batch: data, // Use the updated batchData from the state
    }));
  };

  // File upload
  const handleFileUpload = (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const updatedFees = [...formData.fees];
          updatedFees[index].image = downloadUrl;
          setFormData((prevFormData) => ({
            ...prevFormData,
            fees: updatedFees,
          }));
        });
      });
    } else {
      console.log("no file selected");
    }
  };

  // Function to add a new fee
  const addFee = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fees: [
        ...prevFormData.fees,
        {
          amount: "",
          paidamount: "",
          date: "",
          status: "",
          image: "",
        },
      ],
    }));
  };

  // Function to handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes("fees")) {
      // Handle changes for fee details
      const updatedFees = [...formData.fees];
      const [feeName, feeIndex, subField] = name.split(".");
      updatedFees[feeIndex][subField] = value;
      setFormData({ ...formData, fees: updatedFees });
    } else {
      // Handle changes for main form fields
      setFormData({ ...formData, [name]: value });
    }
  };
  // // Function to handle input changes
  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   if (name.includes("fees")) {
  //     // Handle changes for fee details
  //     const updatedFees = [...formData.fees];
  //     const [feeName, feeIndex, subField] = name.split(".");
  //     updatedFees[feeIndex][subField] = value;
  //     setFormData({ ...formData, fees: updatedFees });
  //   } else if (name === "roll_no") {
  //     // Ensure roll_no is treated as a string
  //     setFormData({ ...formData, [name]: String(value) });
  //   } else {
  //     // Handle changes for main form fields
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };
  const [batch, setBatch] = useState("");
  const handleBatchChange = (e) => {
    const selectedBatchId = e.target.value;
    setBatch(selectedBatchId);
    BatchData(selectedBatchId);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    try {
      // Send form data to the API endpoint

      const response = await axios.post(
        "https://lms-backend-avhw.onrender.com/api/v1/student/create-student",
        // "http://localhost:8000/api/v1/student/create-student",
        formData
      );
      const status = "Admitted";
      console.log("Form submitted successfully!", response.data);
      alert("student added successfully");

      if (status === "Admitted") {
        const response = await axios.put(
          `https://lms-backend-avhw.onrender.com/api/v1/admissions/${applicationId}`,
          {
            status: "Admitted",
          }
        );
        const data = response.data;
        alert("Status changed Successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="modalBox">
      <Modal.Header closeButton>
        <Modal.Title>Admit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="flexModal">
            <NativeSelect
              style={{ margin: "0.5rem", width: "45%" }}
              name="batch"
              value={batch ? batch.batchname : ""}
              onChange={handleBatchChange}
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batchname}
                </option>
              ))}
            </NativeSelect>
            <TextField
              style={{ margin: "0.5rem", width: "50%" }}
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="text"
              name="roll_no"
              label="Roll No"
              value={formData.roll_no}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flexModal">
            {formData.fees.map((fee, index) => (
              <div key={index}>
                {/* Add fields for fee details */}
                <TextField
                  style={{ margin: "0.5rem", width: "45%" }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="text"
                  name={`fees.${index}.amount`}
                  label="Amount"
                  value={fee.amount}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <TextField
                  style={{ margin: "0.5rem", width: "45%" }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="text"
                  name={`fees.${index}.paidamount`}
                  label="Paid Amount"
                  value={fee.paidamount}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <TextField
                  style={{ margin: "0.5rem", width: "45%" }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="date"
                  name={`fees.${index}.date`}
                  value={fee.date}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <NativeSelect
                  style={{ margin: "0.5rem", width: "45%" }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="text"
                  name={`fees.${index}.status`}
                  label="Status"
                  value={fee.status}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  {" "}
                  <option>Select Status</option>
                  <option>Paid</option>
                  <option>Partial</option>
                  <option>Unpaid</option>
                </NativeSelect>

                <Button
                  style={{ margin: "0.5rem", width: "45%" }}
                  component="label"
                  variant="contained"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    name={`fees.${index}.image`}
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                </Button>

                {index === formData.fees.length - 1 && (
                  <Button
                    style={{ margin: "0.5rem", width: "45%" }}
                    variant="outlined"
                    onClick={addFee}
                  >
                    Add fee
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* <button type="submit">Submit</button> */}
          <Modal.Footer>
            <Button variant="contained" onClick={handleSubmit}>
              Admit Student
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentAdmitModal;
