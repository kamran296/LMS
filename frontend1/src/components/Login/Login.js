// import React, { useState } from "react";
// import axios from "axios";
// import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
// import "./Login.css";
// import { Link } from "react-router-dom";
// function Login() {
//   const [loginweb, setloginweb] = useState("");
//   const [passweb, setpassweb] = useState("");
//   const [, setMessage] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/login", {
//         loginweb,
//         passweb,
//       });
//       if (response.data.success) {
//         setMessage(response.data.message);
//         // Redirect to the home page or perform other actions upon successful login
//         alert("Successfully Logged in");
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <h1 className="mainTitle">
//         Welcome to <span> Coding Circle Academy</span>
//       </h1>
//       <h4 className="loginTitle">Login with your credentials🔑 </h4>

//       <div fluid className="p-3 mainContainer">
//         <div className="subContainer">
//           <div col="" md="">
//             <img
//               src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
//               className="img-fluid"
//               height={500}
//               width={500}
//               alt="Homeimage"
//             />
//           </div>

//           <div col="" md="">
//             <MDBInput
//               wrapperClass="mb-4"
//               label="Branch Name"
//               type="email"
//               size="lg"
//               value={loginweb}
//               onChange={(e) => setloginweb(e.target.value)}
//             />
//             <MDBInput
//               wrapperClass="mb-4"
//               label="Password"
//               type="password"
//               size="lg"
//               value={passweb}
//               onChange={(e) => setpassweb(e.target.value)}
//             />
//             <Link to="/dashboard">
//               <MDBBtn className="mb-4 w-100" size="lg" onClick={handleLogin}>
//                 Sign in
//               </MDBBtn>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import "./Login.css";
// import { Link, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        username,
        password,
      });

      if (response.data.success) {
        // Store the authentication token in localStorage or a state management solution
        localStorage.setItem("authToken", response.data.authToken);

        setMessage(response.data.message);
        alert("Successfully Logged in");

        // Redirect to the dashboard page or any other authenticated route
        navigate("/dashboard");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      alert("wrong credentials");
    }
  };

  return (
    <>
      {/* ... (existing code) */}
      <div fluid className="p-3 mainContainer">
        <div className="subContainer">
          <div col="" md="">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              height={500}
              width={500}
              alt="Homeimage"
            />
          </div>

          <div col="" md="">
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
            <MDBBtn className="mb-4 w-100" size="lg" onClick={handleLogin}>
              Sign in
            </MDBBtn>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
