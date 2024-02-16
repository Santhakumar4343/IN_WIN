import React, { useEffect, useState } from "react";
import "../Login/Basestyle.css";
import "../Register/Register.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { BASE_URl } from "../API/Api";

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[a-z0-9.]+@[a-z]+\.[a-z]+$/;
    const mobileValidation = /^[6-9]\d{9}$/;

    if (!values.userName) {
      error.userName = "User Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.mobileNumber) {
      error.mobileNumber = "Mobile Number is required";
    } else if (!mobileValidation.test(values.mobileNumber)) {
      error.mobileNumber = "This is not a valid Mobile Number!";
    }
    return error;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .post(`${BASE_URl}/api/users/send-otp`, user)
        .then((res) => {
          setOtpModalOpen(true);
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
        });
    }
  };

  const verifyOtp = () => {
    axios
      .post(`${BASE_URl}/api/users/verify-otp?otp=${otp}`)
      .then((res) => {
        alert("User registered successfully!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP! Please try again.");
      });
  };
  

  return (
   
    <>
        {!otpModalOpen && (
            <div className="register">
            <form>
              <h1>Create your account</h1>
              <input
                type="text"
                name="userName"
                id="fname"
                placeholder="User Name"
                onChange={changeHandler}
                value={user.userName}
              />
              <p className="error">{formErrors.userName}</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={changeHandler}
                value={user.email}
              />
              <p className="error">{formErrors.email}</p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={changeHandler}
                value={user.password}
              />
              <p className="error">{formErrors.password}</p>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Mobile Number"
                onChange={changeHandler}
                value={user.mobileNumber}
              />
              <p className="error">{formErrors.mobileNumber}</p>
              <button className="button_common" onClick={signupHandler}>
                Register
              </button>
            </form>
            <NavLink to="/">Already registered? Login</NavLink>
          </div>
          )}
          {otpModalOpen && (
            <div className="otp-modal">
              <h1>Enter OTP</h1>
              <input
              className="otp-input"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="otp-button" onClick={verifyOtp}>Verify OTP</button>
            </div> 
          )}
          </>
  );
};

export default Register;
