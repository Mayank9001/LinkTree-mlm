import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "./styles/Preview.module.css";
import Boy from "../assets/Boy.png";
import logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spark from "../assets/Spark.png";
import { getProfile, visitProfile } from "../services/profile.services";
import useIsMobile from "../components/hooks/useIsMobile";
import { getLinks } from "../services/link.services";
import Instagram from "../assets/svgs/Instagram.svg";
import FaceBook from "../assets/svgs/FaceBook.svg";
import YouTube from "../assets/svgs/YouTube.svg";
import X from "../assets/svgs/X.svg";
const url = import.meta.env.VITE_FRONTEND_URL;
const Preview = ({ onClose, profileData, isLinkChanged, designData }) => {
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
      bgColor: "",
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
  const appIcons = {
    Instagram: Instagram,
    FaceBook: FaceBook,
    YouTube: YouTube,
    X: X,
  };
  const isMobile = useIsMobile();
  const [appLinks, setAppLinks] = useState([]);
  const [shopLinks, setShopLinks] = useState([]);
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(true);
  const navigate = useNavigate();
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
          bgColor: temp.profile.buttonStyle.bgColor,
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
  const getLink = async () => {
    const res = await getLinks();
    const data = await res.json();
    if (res.status === 200) {
      const apps = data.links
        .filter((link) => link.linkType === "app")
        .filter((link) => link.show === true);
      const shops = data.links
        .filter((link) => link.linkType === "shop")
        .filter((link) => link.show === true);
      setAppLinks(apps);
      setShopLinks(shops);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  useEffect(() => {
    // getDetails();
    getLink();
  }, [isLinkChanged]);
  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged Out Successfully!!!");
    navigate("/login");
  };
  const handleConnected = async () => {
    // const profileId = profile.profileId;
    // const res = await visitProfile({ profileId });
    // const data = await res.json();
    // if (res.status === 200) {
    // localStorage.clear();
    window.open(url, "_blank");
    // }
  };
  const handleCopyLink = () => {
    toast.success("copied to clipboard");
    navigator.clipboard.writeText(url + "/profile/" + profile.username);
  };
  useEffect(() => {
    if (profileData) {
      setProfile((prevData) => ({
        ...prevData,
        username: profileData.username,
        profileId: profileData.profileId,
        profilePic: profileData.profilePic,
        banner: {
          profileBg: profileData.banner.profileBg,
          fontColor: profileData.banner.fontColor,
        },
      }));
    }
  }, [profileData]);
  useEffect(() => {
    if (designData) {
      setProfile((prevData) => ({
        ...prevData,
        layout: designData.layout,
        buttonStyle: {
          bgColor: designData.buttonStyle.bgColor,
          boxShadow: designData.buttonStyle.boxShadow,
          border: designData.buttonStyle.border,
          borderRadius: designData.buttonStyle.borderRadius,
          fontFamily: designData.buttonStyle.fontFamily,
          fontColor: designData.buttonStyle.fontColor,
        },
        themes: {
          bgColor: designData.themes.bgColor,
        },
      }));
    }
  }, [designData]);
  // if (profileData) {
  //   console.log("data", profileData);
  //   console.log("profile", profile);
  // }
  // if (designData) {
  //   console.log("profile", profile);
  //   console.log("designData", designData);
  // }
  return (
    <>
      <div
        className={styles.main}
        style={{ backgroundColor: profile.themes.bgColor }}
      >
        <div
          className={styles.header}
          style={{ display: !isMobile ? "none" : "" }}
        >
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
              className={`${styles.showLinks} ${
                isLinkActive
                  ? profile.layout === "Grid"
                    ? styles.gridlayout
                    : profile.layout === "Carousel"
                    ? styles.carousel
                    : styles.stack
                  : styles.stack
              }`}
              style={{
                height: `13rem`,
              }}
            >
              {(isLinkActive ? appLinks : shopLinks).map((link, index) => (
                <div
                  className={`${
                    isLinkActive
                      ? profile.layout === "Grid"
                        ? styles.gridlink
                        : profile.layout === "Carousel"
                        ? styles.carousellink
                        : styles.link
                      : styles.shoplink
                  }`}
                  key={link._id}
                  onClick={() => window.open(link.linkUrl, "_blank")}
                  style={{
                    backgroundColor:
                      profile.themes.bgColor !== "#ffffff"
                        ? profile.buttonStyle.bgColor
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
                    justifyContent: link.linkType === "shop" ? "center" : "",
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        profile.buttonStyle.bgColor === "#ffffff"
                          ? "#f3f3f1"
                          : "#ffffff",
                      display: link.linkType === "shop" ? "none" : "",
                    }}
                  >
                    {!isLinkActive ? (
                      <img src={link.shopImg} alt="shopImage" />
                    ) : (
                      <img
                        style={{ width: "1.25rem", height: "1.25rem" }}
                        src={appIcons[link.appType]}
                        alt={`${link.appType}`}
                      />
                    )}
                  </div>
                  <span>{link.linkTitle}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            className={isMobile ? styles.connected : styles.deskconnected}
            onClick={handleConnected}
          >
            Get Connected
          </button>
          <div
            className={styles.icon}
            style={{ display: isMobile ? "none" : "" }}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_197_238)">
                <path
                  d="M18.5201 7.77034C18.3615 7.6162 18.1389 7.54615 17.9212 7.58196C17.703 7.61764 17.5146 7.75462 17.4133 7.95118C17.0652 8.62743 16.6231 9.24889 16.1029 9.79826C16.1547 9.40141 16.1808 9.00219 16.1808 8.6019C16.1808 7.83383 16.0779 7.04344 15.8748 6.25239C15.2069 3.65413 13.4557 1.45681 11.0703 0.223887C10.8626 0.116582 10.6152 0.12035 10.4109 0.233934C10.2065 0.347566 10.0727 0.555897 10.0544 0.788927C9.86842 3.15011 8.6522 5.29827 6.71572 6.68398C6.6901 6.70245 6.66465 6.72115 6.63921 6.73975C6.58651 6.77831 6.53684 6.81478 6.49042 6.84538C6.48316 6.85022 6.47595 6.85515 6.46888 6.86022C5.25098 7.7322 4.24607 8.89456 3.56266 10.222C2.86822 11.5722 2.51611 13.0211 2.51611 14.5284C2.51611 15.2962 2.61905 16.0866 2.82208 16.8778C3.8935 21.048 7.64636 23.9606 11.9483 23.9606C17.149 23.9606 21.38 19.7293 21.38 14.5284C21.38 11.9637 20.3644 9.5636 18.5201 7.77034Z"
                  fill="black"
                />
                <circle cx="11.4897" cy="14.1567" r="2.80172" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_197_238">
                  <rect
                    width="23.8146"
                    height="23.8146"
                    fill="white"
                    transform="translate(0.283691 0.145996)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span style={{ fontWeight: "800" }}>SPARK</span>
            <span>TM</span>
          </div>
        </div>
        <div
          className={styles.cross}
          onClick={onClose}
          style={{ display: !isMobile ? "none" : "" }}
        >
          <RxCross1 color="black" size={16} />
        </div>
      </div>
    </>
  );
};

export default Preview;
