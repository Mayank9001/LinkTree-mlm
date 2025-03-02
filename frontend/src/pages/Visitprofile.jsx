import React, { useState, useEffect } from "react";
import styles from "../components/styles/Preview.module.css";
import Boy from "../assets/Boy.png";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spark from "../assets/Spark.png";
import { visitProfile, getGlobalProfile } from "../services/profile.services";
const url = import.meta.env.VITE_FRONTEND_URL;

const Visitprofile = () => {
  const { username } = useParams();
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
    const res = await getGlobalProfile(username);
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
      localStorage.clear();
      window.open(url, "_blank");
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url + "/profile/" + profile.username);
  };
  console.log("Profile", profile);
  return (
    <>
      <div
        className={styles.main}
        style={{ backgroundColor: profile.themes.bgColor }}
      >
        <div className={styles.header}>
          <img src={Spark} className={styles.logo} alt="logo" />
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
                  13.5
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
      </div>
    </>
  );
};

export default Visitprofile;
