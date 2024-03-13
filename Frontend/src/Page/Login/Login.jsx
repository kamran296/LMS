import React, { useState } from "react";
import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://lms-1-9sat.onrender.com/api/v1/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Store the authentication token in localStorage or a state management solution
        console.log(username, password);
        localStorage.setItem("authToken", response.data.authToken);

        setMessage(response.data.message);
        alert("Successfully Logged in");

        // Redirect to the dashboard page or any other authenticated route
        navigate("/dashboard");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(username, password);
      alert("wrong credentials");
    }
  };

  return (
    <>
      <h1 className="mainTitle">Coding Circle Academy</h1>
      <div fluid className="p-3 mainContainer">
        <div className="subContainer">
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/205/841/original/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-3d-illustration-png.png"
            className="img-fluid"
            id="bannerImage"
            alt="Homeimage"
          />

          <div className="LoginformBox">
            <h2 className="signTitle">Sign in your account</h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Branch Name"
              type="email"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <MDBBtn onClick={handleLogin} id="SiginBtn">
              Sign In
            </MDBBtn>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
