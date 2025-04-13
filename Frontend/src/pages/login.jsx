import React, { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "../assets/css/login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { GrGoogle, GrFacebookOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import CatGif from "../assets/images/cutty.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Profile from "../Components/profile";

export const setUserValue = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUserValue = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState({
    email: false,
    password: false,
    general: false,
  });

  function handleChange(e) {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));
    setShowTooltip((prev) => ({ ...prev, [name]: false }));
  }

  function validateForm() {
    let newErrors = {};
    let tooltipState = { email: false, password: false, general: false };

    if (!value.email.trim()) {
      newErrors.email = "Enter a valid email";
      tooltipState.email = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.email = "Invalid email format!";
      tooltipState.email = true;
    }

    if (!value.password.trim()) {
      newErrors.password = "Password is required!";
      tooltipState.password = true;
    } else if (value.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
      tooltipState.password = true;
    }

    setErrors(newErrors);
    setShowTooltip(tooltipState);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/login", value);
        if (response.data.message === "ok") {
          setUserValue({ email: response.data.email, name: response.data.name });
          window.location.href = "/record";
        } else if (response.data === "incorrect") {
          Swal.fire("Incorrect password");
        } else if (response.data === "not") {
          Swal.fire("Account not found");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors((prev) => ({ ...prev, general: "Invalid email or password!" }));
        setShowTooltip((prev) => ({ ...prev, general: true }));
      }
    }
  }

  return (
    <div className="container-fluid h-100 w-100 d-flex align-items-center flex-column" data-aos="zoom-out">
      <div className="w-100 p-0">
        <Profile />
      </div>
      <img src={CatGif} alt="Cat" className="h-25" />
      <div className="login-outer p-4 shadow-lg container">
        <h2 className="text-center mb-2" style={{ fontWeight: 700 }}>Login</h2>
        <h4 className="text-center text-muted">Welcome back!</h4>

        <form className="w-100 p-2 d-flex flex-column align-items-center container-fluid" onSubmit={handleSubmit}>
          {/* Email Input */}
          <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-email">{errors.email}</Tooltip>} show={showTooltip.email}>
            <div className="input-group w-100 mb-3">
              <span className="input-group-text h-100">
                <FaUser />
              </span>
              <input
                type="text"
                className="custom-input ms-1"
                placeholder="Email ID"
                value={value.email}
                onChange={handleChange}
                name="email"
              />
            </div>
          </OverlayTrigger>

          {/* Password Input */}
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-password">{errors.password}</Tooltip>} show={showTooltip.password}>
            <div className="input-group w-100 mb-2">
              <span className="input-group-text h-100">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="custom-input ms-1"
                placeholder="Password"
                value={value.password}
                onChange={handleChange}
                name="password"
              />
              <span
                className="input-group-text password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </OverlayTrigger>

          {/* Forgot Password Link */}
          <p className="small-text text-primary mt-2 text-end w-100" style={{ cursor: "pointer" }} onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>

          {/* Login Button */}
          <button className="btn btn-primary w-50 mt-1">
            Login <MdLogin />
          </button>

          <p className="small-text">Or</p>
          <div className="d-flex w-100 justify-content-around">
            <button className="btn p-2 btn-other"><GrGoogle /></button>
            <button className="btn p-2 btn-other"><GrFacebookOption /></button>
            <button className="btn p-2 btn-other"><FaXTwitter /></button>
          </div>

          {/* Sign Up Redirect */}
          <p className="mt-3 small-text">
            Don't have an account? <a className="text-primary" onClick={() => navigate("/signup")}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
