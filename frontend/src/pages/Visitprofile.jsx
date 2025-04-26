import React, { useState, useEffect } from "react";
import styles from "./styles/Visitprofile.module.css";
import Boy from "../assets/Boy.png";
import { useParams } from "react-router-dom";
import { visitProfile, getGlobalProfile } from "../services/profile.services";
import useIsMobile from "../components/hooks/useIsMobile";
import { visitLogs } from "../services/logs.services";
import { toast } from "react-toastify";
import Instagram from "../assets/svgs/Instagram.svg";
import FaceBook from "../assets/svgs/FaceBook.svg";
import YouTube from "../assets/svgs/YouTube.svg";
import X from "../assets/svgs/X.svg";
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
  const appIcons = {
    Instagram: Instagram,
    FaceBook: FaceBook,
    YouTube: YouTube,
    X: X,
  };
  const isMobile = useIsMobile();
  const [appLinks, setAppLinks] = useState([]);
  const [shopLinks, setShopLinks] = useState([]);
  const [isLinkActive, setIsLinkActive] = useState(true);
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
      const apps = temp.links
        .filter((link) => link.linkType === "app")
        .filter((link) => link.show === true);
      const shops = temp.links
        .filter((link) => link.linkType === "shop")
        .filter((link) => link.show === true);
      setAppLinks(apps);
      setShopLinks(shops);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  const handleLinkOpen = async (link) => {
    const res = await visitLogs(link._id);
    const data = await res.json();
    if (res.status === 200) {
      window.open(
        !link.linkUrl.includes("https://")
          ? "https://" + link.linkUrl
          : link.linkUrl,
        "_blank"
      );
    }
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
    toast.success("copied to clipboard");
    navigator.clipboard.writeText(url + "/profile/" + profile.username);
  };
  return (
    <>
      <div className={!isMobile ? styles.maincontent : ""}>
        <div
          className={!isMobile ? styles.deskmain : styles.main}
          style={{ backgroundColor: profile.themes.bgColor }}
        >
          <div className={!isMobile ? styles.deskcontent : styles.content}>
            <div
              className={!isMobile ? styles.deskbanner : styles.banner}
              style={{ backgroundColor: profile.banner.profileBg }}
            >
              <img src={profile.profilePic} />
              <div
                style={{ color: profile.banner.fontColor }}
                className={!isMobile ? styles.deskusername : styles.username}
              >
                @{profile.username}
              </div>
              <div
                className={!isMobile ? styles.deskopenLink : styles.openLink}
                onClick={handleCopyLink}
              >
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
              <div
                className={
                  !isMobile
                    ? styles.desktoggleContainer
                    : styles.toggleContainer
                }
              >
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
                className={`${styles.deskshowLinks} ${
                  isLinkActive
                    ? profile.layout === "Grid"
                      ? styles.gridlayout
                      : profile.layout === "Carousel"
                      ? styles.carousel
                      : styles.stack
                    : styles.stack
                }`}
                style={{
                  height: `14rem`,
                }}
              >
                {(isLinkActive ? appLinks : shopLinks).map((link, key) => (
                  <div
                    className={`${
                      isLinkActive
                        ? profile.layout === "Grid"
                          ? styles.gridlink
                          : profile.layout === "Carousel"
                          ? styles.carousellink
                          : styles.desklink
                        : styles.shoplink
                    }`}
                    key={key}
                    onClick={() => handleLinkOpen(link)}
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
                    <div
                      style={{
                        backgroundColor:
                          profile.buttonStyle.backgroundColor === "#ffffff"
                            ? "#f3f3f1"
                            : "#ffffff",
                        display: link.linkType === "shop" ? "none" : "",
                      }}
                    >
                      <img
                        style={{ width: "1.5rem", height: "1.5rem" }}
                        src={appIcons[link.appType]}
                      />
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
            <div className={!isMobile ? styles.deskicon : styles.icon}>
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
        </div>
      </div>
    </>
  );
};

export default Visitprofile;
