import React, { useState } from "react";
import styles from "./styles/SignUp.module.css";
import Spark from "../assets/Spark.png";
import { toast } from "react-toastify";
import { IoMdCheckbox } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../services/user.services";
import image from "../assets/image.png";
import useIsMobile from "../components/hooks/useIsMobile";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
const SignUp = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const validateInput = () => {
    const newError = {};
    if (!formData.firstName.trim()) {
      newError.firstName = "First name required*";
    }
    if (!formData.lastName.trim()) {
      newError.lastName = "Last name required";
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newError.email = "Invalid Email*";
    }
    if (!formData.password.trim()) {
      newError.password = "Please enter your password*";
    } else if (formData.password.length < 8) {
      newError.password = "The password must be at least 8 characters long*";
    } else if (!passwordRegex.test(formData.password)) {
      newError.password =
        "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)";
    }
    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Password did not match*";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    try {
      const res = await userSignup(formData);
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/tellus");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={Spark} alt="spark" />
        </div>
        <div className={styles.title}>Sign in to your Spark</div>
        <div className={styles.form}>
          <div className={styles.createacc}>
            Create an account
            <a href="/login">Sign in instead</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.forminput}>
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                type="text"
                placeholder=""
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <p
                style={{ visibility: errors.firstName ? "visible" : "hidden" }}
              >
                {errors.firstName || "Field Requires"}
              </p>
            </div>
            <div className={styles.forminput}>
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                placeholder=""
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <p style={{ visibility: errors.lastName ? "visible" : "hidden" }}>
                {errors.lastName || "Field Requires"}
              </p>
            </div>
            <div className={styles.forminput}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder=""
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <p style={{ visibility: errors.email ? "visible" : "hidden" }}>
                {errors.email || "Field Requires"}
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
            <div className={styles.forminput}>
              <label htmlFor="cnfpassword">Confirm Password</label>
              <input
                id="cnfpassword"
                type="password"
                placeholder=""
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <p
                style={{
                  visibility: errors.confirmPassword ? "visible" : "hidden",
                }}
              >
                {errors.confirmPassword || "Field Requires"}
              </p>
            </div>
            <div>
              <span className={styles.terms}>
                <IoMdCheckbox size={16} />
                <span>
                  By creating an account, I agree to our{" "}
                  <span style={{ textDecoration: "underline" }}>
                    Terms of use
                  </span>{" "}
                  and{" "}
                  <span style={{ textDecoration: "underline" }}>
                    Privacy Policy
                  </span>
                </span>
              </span>
            </div>
            <div>
              <button type="submit" className={styles.signinbtn}>
                Create an account
              </button>
            </div>
          </form>
        </div>
          <div className={styles.footer}>
            This site is protected by reCAPTCHA and the
            <a>Google Privacy Policy</a>
            and
            <a>Terms of Service</a>
            apply.
          </div>
      </div>
      {!isMobile && (
        <div className={styles.image}>
          <img src={image} />
        </div>
      )}
    </div>
  );
};

export default SignUp;
