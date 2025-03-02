import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "./styles/Preview.module.css";
import Boy from "../assets/Boy.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spark from "../assets/Spark.png";
import { getProfile, visitProfile } from "../services/profile.services";
const url = import.meta.env.VITE_FRONTEND_URL;
const Preview = ({ onClose }) => {
  const [profile, setProfile] = useState({
    username: "",
    profileId: "",
    profilePic: Boy,
    banner: {
      profileBg: "",
      fontColor: "",
    },
    layout: "",
    buttonStyle: {
      backgroundColor: "",
      boxShadow: "",
      border: "",
      borderRadius: "",
      fontFamily: "",
      fontColor: "",
    },
    themes: {
      bgColor: "",
    },
  });
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(true);
  const navigate = useNavigate();
  const appLinks = [
    {
      title: "Instagram",
      url: "https://www.instagram.com/opopo_08/",
      clicks: 0,
    },
    {
      title: "Youtube",
      url: "https://www.youtube.com/opopo_08/",
      clicks: 0,
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/opopo_08/",
      clicks: 0,
    },
    {
      title: "Youtube",
      url: "https://www.youtube.com/opopo_08/",
      clicks: 0,
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/opopo_08/",
      clicks: 0,
    },
    {
      title: "Youtube",
      url: "https://www.youtube.com/opopo_08/",
      clicks: 0,
    },
  ];
  const shopLinks = [
    {
      title: "Amazon",
      url: "https://www.instagram.com/opopo_08/",
      clicks: 0,
      imageUrl: "",
    },
  ];
  const getDetails = async () => {
    const res = await getProfile();
    const temp = await res.json();
    if (res.status === 200) {
      setProfile({
        profileId: temp.profile._id,
        username: temp.profile.username,
        profilePic: temp.profile.profilePic,
        banner: {
          profileBg: temp.profile.banner.profileBg,
          fontColor: temp.profile.banner.fontColor,
        },
        layout: temp.profile.layout,
        buttonStyle: {
          backgroundColor: temp.profile.buttonStyle.bgColor,
          boxShadow: temp.profile.buttonStyle.boxShadow,
          border: temp.profile.buttonStyle.border,
          borderRadius: temp.profile.buttonStyle.borderRadius,
          fontFamily: temp.profile.buttonStyle.fontFamily,
          fontColor: temp.profile.buttonStyle.fontColor,
        },
        themes: {
          bgColor: temp.profile.themes.bgColor,
        },
      });
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged Out Successfully!!!");
    navigate("/login");
  };
  const handleConnected = async () => {
    const profileId = profile.profileId;
    const res = await visitProfile({ profileId });
    const data = await res.json();
    if (res.status === 200) {
      // localStorage.clear();
      window.open(url, "_blank");
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url + "/profile/" + profile.username);
  };
  return (
    <>
      <div
        className={styles.main}
        style={{ backgroundColor: profile.themes.bgColor }}
      >
        <div className={styles.header}>
          <img src={Spark} className={styles.logo} alt="logo" />
          <img
            src={
              typeof profile.profilePic === "object"
                ? URL.createObjectURL(profile.profilePic)
                : profile.profilePic
            }
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
        <div className={styles.content}>
          <div
            className={styles.banner}
            style={{ backgroundColor: profile.banner.profileBg }}
          >
            <img src={profile.profilePic} />
            <div
              style={{ color: profile.banner.fontColor }}
              className={styles.username}
            >
              @{profile.username}
            </div>
            <div className={styles.openLink} onClick={handleCopyLink}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2677 4.02581L11.6299 4.38861L12.3542 3.66301L11.9921 3.30019L8.91895 0.22168H8.19462L5.12153 3.30019L4.75935 3.66301L5.48369 4.38861L5.84586 4.02581L8.0446 1.82318V9.82004V10.3331H9.06897V9.82004V1.82318L11.2677 4.02581ZM1.38623 5.71537L1.89841 5.20228H4.45933V6.22846H2.4106V15.464H14.703V6.22846H12.6542V5.20228H15.2152L15.7273 5.71537V15.9771L15.2152 16.4902H1.89841L1.38623 15.9771V5.71537Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className={styles.links}>
            <div className={styles.toggleContainer}>
              <span
                onClick={() => setIsLinkActive(true)}
                className={isLinkActive ? styles.active : styles.inactive}
              >
                link
              </span>
              <span
                onClick={() => setIsLinkActive(false)}
                className={!isLinkActive ? styles.active : styles.inactive}
              >
                Shop
              </span>
            </div>
            <div
              className={styles.showLinks}
              style={{
                height: `${Math.min(
                  4.5 * (isLinkActive ? appLinks : shopLinks).length,
                  9
                )}rem`,
              }}
            >
              {(isLinkActive ? appLinks : shopLinks).map((link, key) => (
                <div
                  className={styles.link}
                  key={key}
                  style={{
                    backgroundColor:
                      profile.themes.bgColor !== "#ffffff"
                        ? profile.buttonStyle.backgroundColor
                        : "",
                    color: profile.buttonStyle.fontColor,
                    boxShadow: profile.buttonStyle.boxShadow,
                    border: profile.buttonStyle.border,
                    borderRadius:
                      profile.buttonStyle.borderRadius === "0.3rem"
                        ? "1rem"
                        : profile.buttonStyle.borderRadius !== "0.85rem"
                        ? "0"
                        : "",
                    fontFamily: profile.buttonStyle.fontFamily,
                  }}
                >
                  <div style={{ backgroundColor: "" }}>
                    <svg
                      width="28"
                      height="21"
                      viewBox="0 0 28 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.7946 1.4163C25.9755 1.73242 26.9037 2.66045 27.2197 3.84138C27.791 5.97968 27.7933 10.4437 27.7933 10.4437C27.7933 10.4437 27.7933 14.9078 27.2197 17.0461C26.9037 18.227 25.9755 19.155 24.7946 19.4711C22.6564 20.0447 14.0782 20.0447 14.0782 20.0447C14.0782 20.0447 5.50019 20.0447 3.36188 19.4711C2.18096 19.155 1.25293 18.227 0.936809 17.0461C0.363281 14.9078 0.363281 10.4437 0.363281 10.4437C0.363281 10.4437 0.363281 5.97968 0.936809 3.84138C1.25293 2.66045 2.18096 1.73242 3.36188 1.4163C5.50019 0.842774 14.0782 0.842773 14.0782 0.842773C14.0782 0.842773 22.6564 0.842774 24.7946 1.4163ZM18.4589 10.4441L11.3327 14.5581V6.33003L18.4589 10.4441Z"
                        fill="#FF0000"
                      />
                      <path
                        d="M11.3327 14.5581L18.4589 10.4441L11.3327 6.33003V14.5581Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {link.title}
                </div>
              ))}
            </div>
          </div>
          <button className={styles.connected} onClick={handleConnected}>
            Get Connected
          </button>
        </div>
        <div className={styles.cross} onClick={onClose}>
          <RxCross1 color="black" size={16} />
        </div>
      </div>
    </>
  );
};

export default Preview;
