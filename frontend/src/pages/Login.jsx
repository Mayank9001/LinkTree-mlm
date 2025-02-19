import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import Spark from "../assets/Spark.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  console.log(password);
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <img src={Spark} alt="spark" />
      </div>
      <div className={styles.title}>Sign in to your Spark</div>
      <div className={styles.form}>
        <form>
          <div className={styles.forminput}>
            <label>Username</label>
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
          <div>
            <button type="submit" className={styles.signinbtn}>Sign in</button>
          </div>
        </form>
        <div className={styles.formfoot}></div>
      </div>
    </div>
  );
};

export default Login;
