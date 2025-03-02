import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./styles/Settings.module.css";
import { getProfile } from "../services/profile.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spark from "../assets/Spark.png";
import { userDetails, updateUser } from "../services/user.services";
import Boy from "../assets/Boy.png";
import useIsMobile from "../components/hooks/useIsMobile";

const Settings = () => {
  const active = {
    isLinks: false,
    isAppearance: false,
    isAnalytics: false,
    isSettings: true,
  };
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(Boy);
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    newPassword: "",
    newConfirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const getDetails = async () => {
    const res = await userDetails();
    const data = await res.json();
    if (res.status === 200) {
      setFormData({
        newFirstName: data.user.userDetails.firstName,
        newLastName: data.user.userDetails.lastName,
        newEmail: data.user.userDetails.email,
        newPassword: "",
        newConfirmPassword: "",
      });
      setName(
        data.user.userDetails.firstName + " " + data.user.userDetails.lastName
      );
    }
  };
  const getProfilePic = async () => {
    const response = await getProfile();
    const profileData = await response.json();
    if (response.status === 200) {
      setProfilePic(profileData.profile.profilePic);
    }
  };
  useEffect(() => {
    getProfilePic();
    getDetails();
  }, []);
  const validateInput = () => {
    const newError = {};
    if (formData.newPassword !== formData.newConfirmPassword) {
      newError.confirmPassword = "Password did not match*";
      newError.password = "The password you entered does not match*";
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
      const res = await updateUser(formData);
      const data = await res.json();
      if (res.status === 200) {
        getDetails();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged Out Successfully!!!");
    navigate("/login");
  };
  return (
    <>
      <Navbar active={active} />
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{ display: !isMobile ? "none" : "" }}
        >
          <img src={Spark} className={styles.logo} alt="logo" />
          <img
            src={profilePic}
            alt="profile"
            className={styles.pic}
            onClick={() => setLogoutVisible((prev) => !prev)}
          />
          <div className={styles.logout}>
            {logoutVisbile && (
              <button
                onClick={handleLogout}
                style={{ visibility: logoutVisbile ? "visible" : "hidden" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <path
                      d="M20.9678 18.4478C20.9581 18.7929 20.8791 19.1326 20.7356 19.4467C20.5921 19.7607 20.3869 20.0427 20.1322 20.2759C19.8776 20.5091 19.5787 20.6887 19.2532 20.8041C18.9278 20.9196 18.5825 20.9684 18.2378 20.9478C16.0848 20.9598 13.9318 20.9478 11.7788 20.9478C11.6462 20.9478 11.519 20.8951 11.4253 20.8013C11.3315 20.7076 11.2788 20.5804 11.2788 20.4478C11.2788 20.3152 11.3315 20.188 11.4253 20.0942C11.519 20.0004 11.6462 19.9478 11.7788 19.9478C13.9788 19.9478 16.1788 19.9798 18.3788 19.9478C19.4858 19.9318 19.9678 19.0998 19.9678 18.1098V5.64677C19.975 5.33215 19.8862 5.02281 19.7133 4.75987C19.5404 4.49693 19.2915 4.29285 18.9998 4.17477C18.6546 4.08006 18.2953 4.04789 17.9388 4.07977H11.7788C11.6462 4.07977 11.519 4.02709 11.4253 3.93332C11.3315 3.83956 11.2788 3.71238 11.2788 3.57977C11.2788 3.44716 11.3315 3.31998 11.4253 3.22622C11.519 3.13245 11.6462 3.07977 11.7788 3.07977C14.0028 3.07977 16.2438 2.99477 18.4658 3.07977C18.8061 3.08838 19.1412 3.16457 19.4518 3.30391C19.7623 3.44326 20.0421 3.64298 20.2747 3.89144C20.5074 4.13991 20.6883 4.43216 20.8069 4.75119C20.9256 5.07022 20.9796 5.40967 20.9658 5.74977L20.9678 18.4478Z"
                      fill="black"
                    />
                    <path
                      d="M3.17617 11.6629C3.09212 11.7451 3.04274 11.8564 3.03817 11.9739C3.03951 11.9879 3.03751 12.0022 3.03217 12.0169C3.02417 12.0389 3.03217 12.0439 3.03817 12.0579C3.04248 12.1757 3.09188 12.2874 3.17617 12.3699L6.84517 16.0389C6.93948 16.13 7.06578 16.1804 7.19688 16.1792C7.32797 16.1781 7.45338 16.1255 7.54608 16.0328C7.63879 15.9401 7.69137 15.8147 7.69251 15.6836C7.69365 15.5525 7.64325 15.4262 7.55217 15.3319L4.73717 12.5159H15.4792C15.6118 12.5159 15.739 12.4632 15.8327 12.3694C15.9265 12.2757 15.9792 12.1485 15.9792 12.0159C15.9792 11.8833 15.9265 11.7561 15.8327 11.6623C15.739 11.5686 15.6118 11.5159 15.4792 11.5159H4.73717L7.55217 8.69989C7.64325 8.60559 7.69365 8.47929 7.69251 8.34819C7.69137 8.2171 7.63879 8.09169 7.54608 7.99899C7.45338 7.90628 7.32797 7.8537 7.19688 7.85256C7.06578 7.85142 6.93948 7.90182 6.84517 7.99289L3.17617 11.6629Z"
                      fill="black"
                    />
                  </g>
                </svg>
                Sign out
              </button>
            )}
          </div>
        </div>
        <div
          className={styles.deskHeader}
          style={{ display: isMobile ? "none" : "" }}
        >
          <div>
            Hi, <span>{name}</span>!
          </div>
          <h5>Congratulations . You got a great response today . </h5>
        </div>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div
              className={styles.header}
              style={{ display: isMobile ? "none" : "" }}
            >
              Edit Profile
            </div>
            <div
              className={styles.edithoriline}
              style={{ display: isMobile ? "none" : "" }}
            ></div>
            <div
              className={styles.horiline}
              style={{ display: isMobile ? "none" : "" }}
            ></div>
            <div className={styles.forminput}>
              <label>First name</label>
              <input
                type="text"
                placeholder=""
                defaultValue={formData.newFirstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newFirstName: e.target.value.trim(),
                  })
                }
              />
              <p
                style={{ visibility: errors.firstName ? "visible" : "hidden" }}
              >
                {errors.firstName || "Field Requires"}
              </p>
            </div>
            <div className={styles.forminput}>
              <label>Last name</label>
              <input
                type="text"
                placeholder=""
                defaultValue={formData.newLastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newLastName: e.target.value.trim(),
                  })
                }
              />
              <p style={{ visibility: errors.lastName ? "visible" : "hidden" }}>
                {errors.lastName || "Field Requires"}
              </p>
            </div>
            <div className={styles.forminput}>
              <label>Email</label>
              <input
                type="text"
                placeholder=""
                defaultValue={formData.newEmail}
                onChange={(e) =>
                  setFormData({ ...formData, newEmail: e.target.value.trim() })
                }
              />
              <p style={{ visibility: errors.email ? "visible" : "hidden" }}>
                {errors.email || "Field Requires"}
              </p>
            </div>
            <div className={styles.forminput}>
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                defaultValue={formData.newPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newPassword: e.target.value.trim(),
                  })
                }
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
                defaultValue={formData.newConfirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newConfirmPassword: e.target.value.trim(),
                  })
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
              <button type="submit" className={styles.signinbtn}>
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
