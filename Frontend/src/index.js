import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAWoVsH-bjdGj9byItGuPa5Tr7jsaKKN1g",
  authDomain: "lms-project-45488.firebaseapp.com",
  projectId: "lms-project-45488",
  storageBucket: "lms-project-45488.appspot.com",
  messagingSenderId: "244570284776",
  appId: "1:244570284776:web:568b31fb8493fd05351f5d",
  measurementId: "G-RYDYB017WM",
};
firebase.initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
