const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const mongoose = require("mongoose");

const login = require("./controllers/loginController");

const app = express();
app.use(cors());
app.use(express.json());

// Connecting database
mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err, " error connecting database");
  });

// Initializing Admin
login.initializeAdmin();

// middleware

// router
const loginRouter = require("./routes/loginRouter");
const courseRouter = require("./routes/courseRouter");
const addmissionRouter = require("./routes/admissionRouter");
const teacherRouter = require("./routes/teacherRouter");
const batchRouter = require("./routes/batchRouter");
// const enquiryRouter = require("./routes/enquiryRouter");
const studentRouter = require("./routes/studentRouter");
const attendanceRouter = require("./routes/attendanceRouter");
// const testingRouter = require("./routes/testing");

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admissions", addmissionRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/batch", batchRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/attendance", attendanceRouter);
// app.use("api/v1/enquiry", enquiryRouter);
// app.use("/api", testingRouter);
const port = process.env.port;
app.listen(port || 3000, () => {
  console.log(`application running on ${port}`);
});
