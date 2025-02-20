import React, { useState } from "react";
import styles from "./styles/SignUp.module.css";
import Spark from "../assets/Spark.png";
import { IoMdCheckbox } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <img src={Spark} alt="spark" />
      </div>
      <div className={styles.title}>Sign in to your Spark</div>
      <div className={styles.form}>
        <div className={styles.createacc}>
          Create an account
          <a href="/login">Sign in instead</a>
        </div>
        <form>
          <div className={styles.forminput}>
            <label>First name</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <p style={{ visibility: errors.username ? "visible" : "hidden" }}>
              {errors.username || "Field Requires"}
            </p>
          </div>
          <div className={styles.forminput}>
            <label>Last name</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <p style={{ visibility: errors.username ? "visible" : "hidden" }}>
              {errors.username || "Field Requires"}
            </p>
          </div>
          <div className={styles.forminput}>
            <label>Email</label>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <p style={{ visibility: errors.username ? "visible" : "hidden" }}>
              {errors.username || "Field Requires"}
            </p>
          </div>
          <div className={styles.forminput}>
            <label>Password</label>
            <input
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ visibility: errors.password ? "visible" : "hidden" }}>
              {errors.password || "Field Requires"}
            </p>
          </div>
          <div className={styles.forminput}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ visibility: errors.password ? "visible" : "hidden" }}>
              {errors.password || "Field Requires"}
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
            <button type="submit" className={styles.signinbtn} onClick={()=>navigate("/tellus")}>
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
  );
};

export default SignUp;
