import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import AddProduct from "./Page/AddProduct";
import Login from "./Page/Login/Login";
import CreateCourse from "./Page/CreateCourse";
import Courses from "./Page/Courses";
import StudentAdmission from "./Page/StudentAdmission";
import StudentDetail from "./Page/StudentDetail";
import TeacherRegistration from "./Page/TeacherRegistration";
import Batch from "./Page/Batch";
import BatchList from "./Page/BatchList";
import AdmissionStatus from "./Page/AdmissionStatus";
import StudentView from "./Page/StudentView";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/teacherregistration"
            element={<TeacherRegistration />}
          ></Route>
          <Route
            path="/studentadmission"
            element={<StudentAdmission />}
          ></Route>
          <Route path="/batch" element={<Batch />}></Route>
          <Route path="/batchlist" element={<BatchList />}></Route>
          <Route path="/admissionstatus" element={<AdmissionStatus />}></Route>
          <Route path="/studentdetail" element={<StudentDetail />}></Route>
          <Route path="/course" element={<Courses />}></Route>
          <Route path="/createCourse" element={<CreateCourse />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/studentview/:studentId" element={<StudentView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
