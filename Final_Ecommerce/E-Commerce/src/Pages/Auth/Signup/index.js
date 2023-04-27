import { IdentificationIcon } from "@heroicons/react/outline";
import axios from "axios";

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
import validations from "./validations";

const Swal = require("sweetalert2");

const Signup = () => {
  const navigate = useNavigate();
  const [FirstName, setFirstname] = React.useState("");
  const [LastName, setLastname] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [DateOfBirth, setDateOfBirth] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Number, setNumber] = React.useState("");
  const [Image, setProductImage] = React.useState({
    file: [],
  });
  const [files, setFiles] = React.useState([]);
  const handleimginput = (e) => {
    setProductImage({
      ...Image,
      file: e.target.files,
      // filepreview: URL.createObjectURL(e.target.files[0]),
    });
    setFiles(e.target.files);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Image", files[0]);
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("Email", Email);
    formData.append("Password", Password);
    formData.append("DateOfBirth", DateOfBirth);
    formData.append("Gender", Gender);
    formData.append("Address", Address);
    formData.append("Number", Number);
    const SignUpURL = `http://localhost:5000/signup`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          Accept: "auth",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/signin");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Photo</label>
              <input
                type="file"
                className={styles.input}
                name="Profile Photo"
                onChange={handleimginput}
              />
            </div>

            <div>
              <label className="sr-only">First Name</label>
              <input
                type="text"
                className={styles.input}
                value={FirstName}
                onChange={(e) => setFirstname(e.target.value)}
                name="firstName"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="sr-only">Last Name</label>
              <input
                type="text"
                className={styles.input}
                value={LastName}
                onChange={(e) => setLastname(e.target.value)}
                name="lastName"
                placeholder="Last Name"
              />
            </div>

            <div className="container">
              <div className={styles.input}>
                <div className="form-check">
                  <input
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    defaultValue="option1"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="container">
              <label>Birthdate</label>
              <div className={styles.input}>
                <div>
                  <input
                    type="date"
                    value={DateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    name="birthdate"
                    placeholder="Birthdate"
                  />
                </div>
              </div>
            </div>
            <label className="sr-only">Gender</label>

            <div>
              <label className="sr-only">Address</label>
              <input
                type="text"
                className={styles.input}
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                name="Address"
                placeholder="Address"
              />
            </div>

            <div>
              <label className="sr-only">Phonenumber</label>
              <input
                type="number"
                className={styles.input}
                value={Number}
                onChange={(e) => setNumber(e.target.value)}
                name="phonenumber"
                placeholder="phonenumber"
              />
            </div>

            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                className={styles.input}
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="Password"
                className={styles.input}
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Password"
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Already have an account? Login{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria1-hidden="true"
                />
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
