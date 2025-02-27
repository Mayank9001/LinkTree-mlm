import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import Spark from "../assets/Spark.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../services/user.services";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validateInput = () => {
    const newError = {};
    if (!formData.username.trim()) {
      newError.username = "Email Required!";
    }
    if (!formData.password.trim()) {
      newError.password = "Password Required!";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!validateInput()) {
      return;
    }
    try {
      const res = await userLogin(formData);
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        toast.success(data.message, { autoClose: 1000 });
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <img src={Spark} alt="spark" />
      </div>
      <div className={styles.title}>Sign in to your Spark</div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.forminput}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder=""
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <p style={{ visibility: errors.username ? "visible" : "hidden" }}>
              {errors.username || "Field Requires"}
            </p>
          </div>
          <div className={styles.forminput}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder=""
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <p style={{ visibility: errors.password ? "visible" : "hidden" }}>
              {errors.password || "Field Requires"}
            </p>
          </div>
          <div>
            <button type="submit" className={styles.signinbtn}>
              Sign in
            </button>
          </div>
        </form>
        <div className={styles.formfoot}>
          <span style={{ textDecoration: "underline" }}>Forgot password?</span>
          <span style={{ color: "#000000" }}>
            Don't have an account? <a href="/signup">Sign up</a>
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        This site is protected by reCAPTCHA and the
        <a>Google Privacy Policy</a>
        and
        <a>Terms of Service</a>
        apply.
      </div>
    </div>
  );
};

export default Login;
