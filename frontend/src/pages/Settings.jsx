import React, {useState} from "react";
import Navbar from "../components/Navbar";
import styles from "./styles/Settings.module.css";
import Spark from "../assets/Spark.png";
import Boy from "../assets/Boy.png";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const active = {
    isLinks: false,
    isAppearance: false,
    isAnalytics: false,
    isSettings: true,
  };
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <Navbar active={active} />
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Spark} className={styles.logo} alt="logo" />
          <img src={Boy} alt="profile" className={styles.pic} />
        </div>
        <div className={styles.form}>
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
              <button
                type="submit"
                className={styles.signinbtn}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
