import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "./styles/Appearance.module.css";
import AirBlack from "../assets/themes/AirBlack.png";
import AirGrey from "../assets/themes/AirGrey.png";
import AirSmoke from "../assets/themes/AirSmoke.png";
import AirSnow from "../assets/themes/AirSnow.png";
import MineralBlue from "../assets/themes/MineralBlue.png";
import Preview from "../components/Preview";
import MineralGreen from "../assets/themes/MineralGreen.png";
import MineralOrange from "../assets/themes/MineralOrange.png";
import Spark from "../assets/Spark.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../services/user.services";
import Boy from "../assets/Boy.png";
import { setDesign, getProfile } from "../services/profile.services";
import useIsMobile from "../components/hooks/useIsMobile";

const Appearance = () => {
  const isMobile = useIsMobile();
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const [name, setName] = useState("");
  const [saveBtnClicked, setSaveBtnClicked] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme ? theme : "";
  });
  const navigate = useNavigate();
  const themes = [
    {
      image: AirSnow,
      title: "Air Snow",
      bgColor: "#ffffff",
      borderRadius: "0.3rem",
      buttonColor: "#2A3235",
      buttonFontColor: "#ffffff",
    },
    {
      image: AirGrey,
      title: "Air Grey",
      bgColor: "#EBEEF1",
      borderRadius: "0.3rem",
      buttonColor: "#ffffff",
      buttonFontColor: "#000000",
    },
    {
      image: AirSmoke,
      title: "Air Smoke",
      bgColor: "#2A3235",
      borderRadius: "0.3rem",
      buttonColor: "#ffffff",
      buttonFontColor: "#000000",
    },
    {
      image: AirBlack,
      title: "Air Black",
      bgColor: "#000000",
      borderRadius: "0.3rem",
      buttonColor: "#222222",
      buttonFontColor: "#ffffff",
    },
    {
      image: MineralBlue,
      title: "Mineral Blue",
      bgColor: "#E0F6FF",
      borderRadius: "0.85rem",
      buttonColor: "#E0F6FF",
      buttonFontColor: "#000000",
    },
    {
      image: MineralGreen,
      title: "Mineral Green",
      bgColor: "#E0FAEE",
      borderRadius: "0.85rem",
      buttonColor: "#E0FAEE",
      buttonFontColor: "#000000",
    },
    {
      image: MineralOrange,
      title: "Mineral Orange",
      bgColor: "#FFEEE2",
      borderRadius: "0.85rem",
      buttonColor: "#FFEEE2",
      buttonFontColor: "#000000",
    },
  ];
  const active = {
    isLinks: false,
    isAppearance: true,
    isAnalytics: false,
    isSettings: false,
  };
  const [formData, setFormData] = useState(() => {
    const data = localStorage.getItem("design");
    return data !== "undefined" && data !== null
      ? JSON.parse(data)
      : {
          profilePic: Boy,
          layout: "Stack",
          buttonStyle: {
            fontFamily: "",
            bgColor: "",
            boxShadow: "",
            border: "",
            borderRadius: "",
            fontColor: "",
          },
          themes: {
            bgColor: "",
          },
        };
  });
  const PreviewComp = () => (
    <Preview />
  );
  useEffect(() => {
    localStorage.setItem("design", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);
  const getDetails = async () => {
    const res = await getProfile();
    const temp = await res.json();
    if (res.status === 200) {
      const profile = temp.profile;
      setFormData({
        ...formData,
        profilePic: profile.profilePic,
        layout: profile.layout,
        buttonStyle: {
          fontFamily: profile.buttonStyle.fontFamily,
          bgColor: profile.buttonStyle.bgColor,
          boxShadow: profile.buttonStyle.boxShadow,
          border: profile.buttonStyle.border,
          borderRadius: profile.buttonStyle.borderRadius,
          fontColor: profile.buttonStyle.fontColor,
        },
        themes: {
          bgColor: profile.themes.bgColor,
        },
      });
    }
  };
  const getUserData = async () => {
    const res = await userDetails();
    const temp = await res.json();
    if (res.status === 200) {
      setName(
        temp.user.userDetails.firstName + " " + temp.user.userDetails.lastName
      );
    }
  };
  useEffect(() => {
    getUserData();
    getDetails();
  }, []);
  useEffect(() => {}, [saveBtnClicked]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await setDesign(formData);
      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message);
        getDetails();
      } else {
        toast.error("failed to save try again");
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
            src={formData.profilePic}
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
        <div className={isMobile ? "" : styles.deskcontent}>
          <div
            className={styles.liveview}
            style={{ display: !isMobile ? "" : "none" }}
          >
            {!isMobile && <PreviewComp />}
            <div className={styles.astrik}>
              *To watch for changes, Click on Save. If no changes seen, please
              refresh the page.
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.layouts}>
              <label>Layout</label>
              <div className={styles.layout}>
                <div className={styles.types}>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, layout: "Stack" })
                    }
                    style={{
                      backgroundColor:
                        formData.layout === "Stack"
                          ? isMobile
                            ? "#FFFFFF"
                            : "#f3f3f1"
                          : "#ffffff",
                      border: formData.layout === "Stack" && "none",
                    }}
                  >
                    <svg
                      width="33"
                      height="28"
                      viewBox="0 0 33 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.935059"
                        y="0.928711"
                        width="31.1207"
                        height="6.7027"
                        rx="1.11712"
                        fill="black"
                      />
                      <rect
                        x="0.935059"
                        y="10.9834"
                        width="31.1207"
                        height="6.7027"
                        rx="1.11712"
                        fill="black"
                      />
                      <rect
                        x="0.935059"
                        y="21.0371"
                        width="31.1207"
                        height="6.7027"
                        rx="1.11712"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <label>Stack</label>
                </div>
                <div className={styles.types}>
                  <button
                    onClick={() => setFormData({ ...formData, layout: "Grid" })}
                    style={{
                      backgroundColor:
                        formData.layout === "Grid"
                          ? isMobile
                            ? "#FFFFFF"
                            : "#f3f3f1"
                          : "#ffffff",
                      border: formData.layout === "Grid" && "none",
                    }}
                  >
                    <svg
                      width="33"
                      height="28"
                      viewBox="0 0 33 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1.21873"
                        y="1.20799"
                        width="13.1345"
                        height="11.7297"
                        rx="0.837838"
                        fill="black"
                        stroke="#D2D2D2"
                        strokeWidth="0.558558"
                      />
                      <rect
                        x="18.647"
                        y="1.20799"
                        width="13.1345"
                        height="11.7297"
                        rx="0.837838"
                        fill="black"
                        stroke="#D2D2D2"
                        strokeWidth="0.558558"
                      />
                      <rect
                        x="18.647"
                        y="15.7305"
                        width="13.1345"
                        height="11.7297"
                        rx="0.837838"
                        fill="black"
                        stroke="#D2D2D2"
                        strokeWidth="0.558558"
                      />
                      <rect
                        x="1.21873"
                        y="15.7305"
                        width="13.1345"
                        height="11.7297"
                        rx="0.837838"
                        fill="black"
                        stroke="#D2D2D2"
                        strokeWidth="0.558558"
                      />
                    </svg>
                  </button>
                  <label>Grid</label>
                </div>
                <div className={styles.types}>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, layout: "Carousel" })
                    }
                    style={{
                      backgroundColor:
                        formData.layout === "Carousel"
                          ? isMobile
                            ? "#FFFFFF"
                            : "#f3f3f1"
                          : "#ffffff",
                      border: formData.layout === "Carousel" && "none",
                    }}
                  >
                    <svg
                      width="31"
                      height="28"
                      viewBox="0 0 31 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.469221"
                        y="1.20799"
                        width="17.4914"
                        height="26.2523"
                        rx="0.837838"
                        fill="black"
                        stroke="#D2D2D2"
                        strokeWidth="0.558558"
                      />
                      <rect
                        x="22.2539"
                        y="1.20799"
                        width="7.53282"
                        height="26.2523"
                        rx="0.837838"
                        fill="black"
                        stroke="#D2D2D2"
                        strokeWidth="0.558558"
                      />
                    </svg>
                  </button>
                  <label>Carousel</label>
                </div>
              </div>
            </div>
            <div className={styles.layouts}>
              <label>Buttons</label>
              <div className={styles.styling}>
                <div className={styles.btnStyle}>
                  <label>Fill</label>
                  <div className={styles.btnRow1}>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#000000",
                            boxShadow: "",
                            border: "none",
                            borderRadius: "0",
                            bgFontColor: "#ffffff",
                          },
                        }));
                      }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#000000",
                            boxShadow: "",
                            border: "none",
                            borderRadius: "0.3rem",
                            bgFontColor: "#ffffff",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.3rem", marginLeft: "0.2rem" }}
                    ></button>
                    <button
                      style={{
                        border: "0.035rem solid #00000033",
                        borderRadius: "0.85rem",
                        height: "100%",
                        padding: "1px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "white",
                      }}
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#000000",
                            boxShadow: "",
                            border: "none",
                            borderRadius: "0.85rem",
                            bgFontColor: "#ffffff",
                          },
                        }));
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "black",
                          width: "97.5%",
                          marginLeft: "1px",
                          height: "95%",
                          borderRadius: "0.85rem",
                        }}
                      ></div>
                    </button>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label>Outline</label>
                  <div className={styles.btnRow2}>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "",
                            border: "0.56px solid #000000",
                            borderRadius: "0",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "",
                            border: "0.56px solid #000000",
                            borderRadius: "0.3rem",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.3rem", marginLeft: "0.2rem" }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "",
                            border: "0.56px solid #000000",
                            borderRadius: "0.85rem",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.85rem" }}
                    ></button>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label>Hard Shadow</label>
                  <div className={styles.btnRow3}>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "2.23px 2.23px 0px 0px #000000",
                            border: "0.56px solid #000000",
                            borderRadius: "0",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "2.23px 2.23px 0px 0px #000000",
                            border: "0.56px solid #000000",
                            borderRadius: "0.3rem",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.3rem" }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "2.23px 2.23px 0px 0px #000000",
                            border: "0.56px solid #000000",
                            borderRadius: "0.85rem",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.85rem" }}
                    ></button>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label>Soft Shadow</label>
                  <div className={styles.btnRow4}>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "0px 2.23px 2.23px 0px #00000029",
                            border: "none",
                            borderRadius: "0",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "0px 2.23px 2.23px 0px #00000029",
                            border: "none",
                            borderRadius: "0.3rem",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.3rem" }}
                    ></button>
                    <button
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            bgColor: "#ffffff",
                            boxShadow: "0px 2.23px 2.23px 0px #00000029",
                            border: "none",
                            borderRadius: "0.85rem",
                            bgFontColor: "#000000",
                          },
                        }));
                      }}
                      style={{ borderRadius: "0.85rem" }}
                    ></button>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label>Special</label>
                  <div className={styles.btnRow5}>
                    <div className={styles.btnRow51}>
                      <button>
                        <svg
                          width="96"
                          height="3"
                          viewBox="0 0 101 3"
                          style={{
                            position: "relative",
                            left: "-0.4rem",
                            top: "-0.8rem",
                          }}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M357.883 0.699601V3.04555H0.405273V0.699601H1.18726C1.29897 0.699601 1.35482 0.699601 1.46653 0.755457H1.6341C1.68996 0.699601 1.74581 0.755457 1.80167 0.811313H2.30437C2.41608 0.811313 2.5278 0.867169 2.63951 0.923025C2.69536 0.923025 2.75122 0.978881 2.80708 0.978881L2.91879 1.03474C2.97464 1.09059 3.08635 1.14645 3.14221 1.25816C3.19807 1.36987 3.30978 1.31402 3.42149 1.31402H3.5332C3.58906 1.31402 3.58906 1.31402 3.64491 1.36987C3.70077 1.36987 3.75662 1.42573 3.81248 1.48158C3.86834 1.53744 3.92419 1.53744 3.98005 1.53744H4.37104C4.42689 1.53744 4.42689 1.53744 4.42689 1.48158C4.48275 1.42573 4.53861 1.42573 4.59446 1.42573H5.59987C5.65572 1.42573 5.71158 1.48158 5.82329 1.53744H5.99086C6.10257 1.53744 6.27014 1.48158 6.38185 1.48158C6.49356 1.48158 6.60527 1.42573 6.71698 1.36987C6.99626 1.25816 7.27554 1.14645 7.55482 1.09059C7.8341 0.978881 8.16924 0.923025 8.44852 0.867169C8.7278 0.811313 9.00707 0.811313 9.2305 0.867169H9.50978C9.56563 0.867169 9.67735 0.923025 9.7332 0.923025C9.78906 0.923025 9.84491 0.978881 9.90077 0.978881L10.0125 1.09059L10.18 1.25816C10.2918 1.31402 10.4593 1.42573 10.571 1.42573H10.7386L10.8503 1.31402C10.9062 1.25816 11.0179 1.2023 11.0737 1.2023C11.2413 1.2023 11.353 1.2023 11.5206 1.25816C11.5764 1.25816 11.6323 1.31402 11.744 1.31402C11.744 1.31402 11.7999 1.36987 11.8557 1.36987C11.9116 1.36987 12.0233 1.31402 12.0791 1.36987H12.135C12.1909 1.42573 12.2467 1.42573 12.3584 1.48158C12.4701 1.48158 12.6377 1.48158 12.7494 1.42573H13.3638C13.4197 1.42573 13.4755 1.42573 13.5314 1.48158C13.5873 1.53744 13.7548 1.53744 13.9224 1.53744C14.0341 1.53744 14.1458 1.59329 14.2575 1.64915C14.3692 1.70501 14.5368 1.70501 14.6485 1.70501C14.8161 1.76086 14.9837 1.76086 15.1512 1.70501C15.3188 1.64915 15.3746 1.53744 15.5422 1.48158C15.5981 1.42573 15.7098 1.36987 15.7656 1.36987C15.9332 1.36987 16.1566 1.36987 16.3242 1.48158C16.4918 1.53744 16.7152 1.53744 16.9386 1.53744H17.8882C17.9999 1.53744 18.0557 1.48158 18.1674 1.42573C18.2791 1.42573 18.5026 1.36987 18.6701 1.36987H18.7818L18.8936 1.31402C18.9494 1.31402 19.0053 1.42573 19.0611 1.48158C19.117 1.53744 19.117 1.59329 19.1728 1.64915C19.1728 1.70501 19.1728 1.70501 19.2287 1.76086H19.5638C19.6197 1.76086 19.6755 1.87257 19.7314 1.92843C19.7873 1.92843 19.8431 1.98429 19.9548 1.98429C20.0107 1.98429 20.1224 1.98429 20.1782 1.92843C20.29 1.87257 20.4575 1.81672 20.5692 1.81672C20.6809 1.76086 20.8485 1.81672 20.9602 1.92843C21.0161 1.98429 21.0161 2.04014 21.1278 1.98429C21.1836 1.98429 21.2395 1.92843 21.2954 1.87257L21.5746 1.70501C21.6864 1.64915 21.7981 1.64915 21.9656 1.64915L22.3566 1.70501C22.4125 1.70501 22.5242 1.76086 22.58 1.76086H22.9152C23.4179 1.76086 23.9764 1.76086 24.4791 1.70501C24.8143 1.70501 25.1494 1.64915 25.4287 1.53744L25.5404 1.70501L25.6521 1.81672C25.7638 1.87257 25.8755 1.92843 25.9873 1.92843C26.2665 2.04014 26.5458 2.096 26.8251 2.15185C27.0485 2.20771 27.2719 2.20771 27.4954 2.26357H27.6071C27.8305 2.20771 28.0539 2.20771 28.2773 2.26357C28.4449 2.31942 28.6683 2.31942 28.8359 2.37528H29.3945C29.6179 2.37528 29.8972 2.31942 30.1206 2.26357C30.344 2.20771 30.6233 2.20771 30.8467 2.15185C31.0701 2.096 31.2936 2.04014 31.4611 1.98429H31.5728C31.6287 1.98429 31.6845 1.98429 31.7404 1.92843C31.8521 1.87257 31.908 1.81672 31.9638 1.76086L32.2431 1.5933L32.3548 1.53744C32.4107 1.53744 32.4107 1.53744 32.4665 1.48158H32.5782C32.6341 1.48158 32.69 1.53744 32.7458 1.53744C32.8017 1.59329 32.8575 1.59329 32.9134 1.64915H33.4161C33.4719 1.64915 33.5278 1.5933 33.5837 1.5933L33.6954 1.53744C33.7512 1.48158 33.8071 1.42573 33.9188 1.42573H34.1981L34.4773 1.53744C34.5891 1.59329 34.7008 1.59329 34.8683 1.64915H35.2593C35.3152 1.64915 35.3152 1.64915 35.371 1.70501C35.4269 1.76086 35.4827 1.76086 35.4827 1.76086L35.5945 1.87257C35.7062 1.92843 35.762 1.92843 35.8179 1.92843H36.2089C36.2647 1.92843 36.3206 1.98429 36.3764 1.98429C36.4882 1.98429 36.544 2.04014 36.6557 2.04014H40.5098C41.4035 2.04014 41.6269 2.20771 42.2413 2.26357C42.9674 2.31942 42.9674 2.04014 43.526 2.04014C43.917 2.04014 44.1963 2.31942 44.8107 2.26357C45.7044 2.26357 46.5981 2.04014 47.38 1.64915C47.7152 1.64915 47.8269 1.87257 48.2179 1.87257C48.4972 1.87257 49.0557 1.70501 49.5026 1.64915C49.9494 1.53744 50.3404 1.53744 50.7873 1.64915C51.6809 1.70501 52.5188 1.64915 53.3566 1.42573H54.1945C54.6413 1.14645 54.362 1.48158 55.0323 1.42573C55.3674 1.42573 56.0377 1.31402 57.2107 1.2023H57.3782C58.0485 1.2023 58.7188 1.03474 59.3891 0.811313C61.6233 1.59329 64.6395 0.811313 68.4377 1.03474C69.7782 1.09059 70.5602 1.48158 71.9008 1.48158C73.1296 1.5933 73.4647 1.14645 74.4701 1.03474C75.8107 0.923025 75.6431 1.42573 77.0395 1.25816C77.1512 1.25816 77.6539 1.03474 77.4864 1.03474C78.0449 1.09059 78.3242 1.36987 79.2179 1.48158C79.0503 1.48158 79.4413 1.14645 79.6647 1.25816C80.2791 1.64915 81.7873 1.42573 83.1278 1.70501C83.2954 1.76086 83.1278 1.92843 83.5746 1.92843C83.9098 1.92843 84.0215 2.096 84.4125 2.15185C85.2503 2.20771 86.4233 2.20771 87.4287 2.15185C87.7638 2.15185 87.8755 1.98429 88.2665 1.92843C88.2665 1.92843 88.7692 2.26357 88.7134 1.92843C89.6629 1.81672 89.3278 2.31942 89.9981 2.37528C91.6737 1.98429 94.0755 1.98429 95.1368 1.31402C97.4269 1.36987 99.2701 1.2023 100.331 0.699601C100.946 0.811313 100.276 0.867169 100.331 1.14645C100.722 1.25816 101.113 1.31402 101.169 1.5933C102.677 1.31402 103.18 1.81672 104.185 1.36987C104.744 1.42573 104.856 1.76086 105.47 1.81672C106.252 1.87257 106.364 1.5933 107.202 1.5933C108.319 1.64915 109.324 1.98429 110.665 1.81672C112.173 1.76086 112.285 1.09059 113.681 0.978881C116.083 0.699601 117.535 1.48158 119.713 1.2023C120.104 1.14645 120.439 1.03474 120.998 0.978881C121.166 0.978881 121.333 0.867169 121.445 0.755457C121.948 0.699601 121.668 0.923025 121.892 0.978881C122.618 0.811313 123.344 0.755457 124.07 0.755457C125.243 0.811313 126.416 1.03474 127.533 1.36987C128.818 1.42573 128.874 0.867169 130.103 0.923025C130.382 1.14645 131.108 1.14645 130.94 1.53744C131.387 1.03474 134.012 1.64915 134.403 1.09059C135.521 1.09059 135.018 1.92843 136.135 1.92843C137.476 2.15185 138.09 1.92843 139.989 2.15185C140.436 2.26357 140.827 2.31942 141.274 2.37528C142 2.31942 142.726 2.15185 143.452 1.92843C144.29 1.76086 145.351 1.98429 145.63 1.48158C145.742 1.70501 146.636 1.53744 146.915 1.70501C147.418 1.98429 147.25 1.59329 148.2 1.70501C148.312 1.81672 148.479 1.87257 148.647 1.92843L149.261 1.98429C149.54 1.98429 149.764 2.04014 149.987 2.04014C150.211 2.04014 150.49 2.096 150.713 2.15185C150.825 2.15185 150.937 2.20771 150.993 2.26357L151.104 2.31942L151.216 2.37528H151.328C151.384 2.37528 151.384 2.43113 151.384 2.43113C151.439 2.43113 151.439 2.48699 151.495 2.48699H151.663L151.719 2.43113H151.998C152.054 2.43113 152.11 2.48699 152.166 2.48699H153.674C154.009 2.43113 155.852 2.15185 156.69 2.04014C157.137 1.98429 157.528 1.98429 157.975 2.04014C158.701 2.20771 159.427 2.20771 160.153 2.04014C161.103 1.92843 161.549 1.92843 163.169 1.81672C163.839 1.76086 163.895 1.64915 164.454 1.5933C164.957 1.53744 164.733 1.76086 164.901 1.81672C164.957 1.81672 166.185 1.5933 166.185 1.5933C166.632 1.31402 166.632 1.48158 167.917 1.5933C168.364 1.42573 168.867 1.25816 169.369 1.14645C169.76 1.03474 170.095 0.923025 170.43 0.755457C170.598 0.699601 170.766 0.755457 170.877 0.811313C171.045 0.867169 171.268 0.923025 171.436 0.867169H172.274C172.721 0.811313 173.223 0.867169 173.67 0.923025L174.117 1.03474C174.396 1.09059 174.676 1.09059 174.955 0.978881C175.067 0.923025 175.234 0.923025 175.346 0.923025C175.569 0.923025 175.737 0.978881 175.96 0.978881C176.128 0.978881 176.24 0.978881 176.407 0.923025C176.686 0.867169 176.91 0.867169 177.189 0.867169H177.412C177.524 0.867169 177.58 1.03474 177.636 1.09059C177.915 1.31402 178.25 1.36987 178.641 1.31402C178.921 1.25816 179.2 1.25816 179.423 1.25816H179.814C179.926 1.25816 180.038 1.2023 180.149 1.09059C180.317 0.978881 180.317 0.923025 180.485 0.923025H180.708C180.82 0.978881 180.876 1.09059 180.987 1.14645C181.267 1.31402 181.658 1.09059 181.937 0.978881C182.049 0.923025 182.104 0.923025 182.216 0.923025C182.328 0.923025 182.384 1.03474 182.495 1.09059C182.663 1.09059 182.886 0.978881 182.998 0.867169C183.221 0.811313 183.445 0.811313 183.668 0.811313C183.724 0.811313 183.78 0.755457 183.892 0.755457C184.003 0.755457 184.115 0.811313 184.171 0.867169C184.339 0.923025 184.45 0.978881 184.618 1.03474L184.785 1.2023C184.841 1.25816 184.897 1.36987 185.009 1.42573C185.121 1.48158 185.232 1.53744 185.4 1.53744H186.238C186.517 1.53744 186.796 1.59329 187.02 1.64915C187.578 1.81672 188.081 1.92843 188.639 1.98429C189.98 2.096 191.488 1.76086 192.494 1.98429C193.443 1.87257 193.108 2.37528 193.778 2.43113C195.175 2.15185 197.632 2.37528 199.811 2.20771C200.425 2.15185 201.654 2.20771 201.989 1.76086C202.548 1.87257 202.715 2.096 203.274 2.20771C203.832 2.31942 204.949 2.04014 205.005 2.43113C205.899 2.096 207.072 2.43113 208.468 2.20771C208.636 2.15185 208.803 2.096 208.915 1.98429C209.25 1.92843 209.362 2.26357 209.753 2.20771C209.865 2.096 210.032 2.04014 210.2 1.98429C211.485 1.81672 212.769 1.81672 214.054 1.98429C214.445 2.04014 214.948 1.92843 215.339 1.98429C215.953 2.096 217.07 2.31942 217.908 2.43113C217.74 2.43113 218.131 2.096 218.355 2.20771C219.304 2.76627 221.874 1.87257 223.94 1.98429C225.225 1.70501 225.225 2.37528 226.119 2.43113C226.621 2.43113 226.901 2.43113 226.957 2.65456C227.906 1.92843 231.481 2.48699 232.095 1.5933C232.654 1.42573 232.821 1.81672 232.933 1.81672C233.771 1.87257 233.827 1.70501 235.112 1.5933H235.949C236.173 1.48158 236.285 1.42573 237.681 1.5933C238.63 1.70501 238.575 1.64915 239.859 1.81672C240.027 1.81672 240.194 1.92843 240.306 2.04014C240.585 2.04014 241.088 1.81672 241.591 1.81672C242.596 1.81672 243.658 2.04014 245.445 2.04014C245.836 2.04014 246.227 1.70501 246.283 2.04014C247.176 1.98429 247.456 1.59329 248.014 1.42573C249.411 1.76086 250.863 1.81672 252.315 1.64915C252.148 2.096 252.594 2.20771 252.762 2.48699C256.225 2.20771 259.576 2.87798 262.258 1.42573C262.704 1.42573 263.151 1.48158 263.542 1.64915C264.212 1.76086 264.994 1.98429 265.665 1.64915V1.2023C265.944 1.2023 266.503 1.36987 266.949 1.42573C267.117 1.48158 267.285 1.53744 267.396 1.64915C267.731 1.70501 267.899 1.42573 267.843 1.42573C268.681 1.59329 269.575 1.76086 270.412 1.87257C272.144 2.04014 271.474 0.978881 272.982 1.03474C272.926 1.64915 274.267 1.53744 274.267 2.096C274.267 2.096 276.836 2.096 277.059 2.04014C278.176 1.98429 279.349 1.92843 280.467 1.92843C280.969 1.92843 281.472 1.92843 281.975 1.98429C282.254 1.98429 282.477 2.04014 282.701 2.04014C282.812 2.04014 282.924 2.096 283.036 2.096C283.148 2.096 283.203 2.04014 283.259 2.04014H283.483C283.539 2.04014 283.594 1.98429 283.65 1.98429C283.762 1.92843 283.93 1.87257 284.097 1.87257H284.321C284.432 1.87257 284.488 1.81672 284.6 1.81672C284.712 1.81672 284.823 1.87257 284.935 1.92843C285.158 1.98429 285.326 1.92843 285.549 1.81672C285.773 1.64915 286.052 1.53744 286.331 1.53744C286.443 1.53744 286.555 1.53744 286.667 1.48158C286.89 1.36987 287.058 1.25816 287.169 1.03474C287.225 0.923025 287.281 0.867169 287.393 0.867169H287.672C287.728 0.867169 287.84 0.811313 287.895 0.811313C288.119 0.811313 288.286 0.978881 288.454 1.14645C288.51 1.2023 288.566 1.31402 288.621 1.31402H288.845C289.236 1.31402 289.683 1.42573 290.074 1.42573C290.185 1.42573 290.297 1.42573 290.465 1.36987H290.744C291.079 1.31402 291.414 1.36987 291.749 1.42573C291.749 1.42573 291.749 1.48158 291.694 1.48158C291.805 1.48158 291.861 1.53744 291.973 1.53744H292.531C292.811 1.53744 293.034 1.59329 293.313 1.64915C293.537 1.76086 293.816 1.81672 294.039 1.81672C294.207 1.76086 294.375 1.64915 294.542 1.5933C294.71 1.53744 294.821 1.59329 294.933 1.53744C295.101 1.53744 295.268 1.53744 295.436 1.5933C295.548 1.5933 295.659 1.64915 295.715 1.70501C295.827 1.76086 295.827 1.92843 295.883 1.98429C295.939 2.04014 296.106 1.98429 296.162 1.98429C296.274 1.98429 296.385 1.98429 296.497 1.92843C296.609 1.87257 296.776 1.81672 296.944 1.76086C297.167 1.70501 297.391 2.04014 297.614 1.98429C298.061 1.87257 298.452 1.92843 298.843 1.5933C298.955 1.48158 299.067 1.42573 299.178 1.31402C299.346 1.2023 299.457 1.09059 299.569 0.978881C299.625 0.923025 299.681 0.867169 299.737 0.867169C299.904 0.867169 300.072 0.923025 300.239 0.978881C300.463 0.978881 300.686 1.03474 300.91 1.03474C301.021 1.03474 301.133 1.03474 301.245 0.978881C301.524 0.923025 301.859 0.923025 302.139 0.923025C302.474 0.923025 302.753 0.811313 303.088 0.755457H304.038C304.149 0.811313 304.205 0.923025 304.317 0.923025C304.429 0.923025 304.373 0.923025 304.485 0.867169C304.596 0.811313 304.708 0.811313 304.82 0.811313C304.931 0.811313 305.099 0.755457 305.211 0.755457C305.322 0.699601 305.322 0.755457 305.434 0.811313C305.602 0.923025 305.769 0.978881 305.937 0.978881C306.048 0.978881 306.104 0.867169 306.216 0.867169C306.328 0.811313 306.439 0.811313 306.551 0.811313H307.221C307.333 0.755457 307.501 0.699601 307.612 0.643746C307.724 0.58789 307.836 0.420322 307.948 0.364466C308.059 0.30861 308.283 0.420322 308.394 0.532034C308.506 0.643746 308.618 0.699601 308.73 0.811313C308.841 0.923025 308.785 0.867169 308.841 0.867169C308.953 0.867169 309.009 0.811313 309.121 0.755457C309.176 0.755457 309.344 0.699601 309.4 0.755457C309.456 0.811313 309.456 0.867169 309.456 0.923025C309.456 1.09059 309.623 1.2023 309.791 1.14645H309.847C310.07 1.09059 310.182 0.811313 310.405 0.978881C310.517 1.03474 310.573 1.09059 310.74 1.03474C310.852 0.978881 310.908 0.978881 311.02 0.978881C311.187 0.978881 311.355 1.03474 311.522 1.2023C311.69 1.31402 311.858 1.42573 312.081 1.42573C312.249 1.42573 312.36 1.2023 312.584 1.2023C312.695 1.2023 312.863 1.2023 312.975 1.25816C313.03 1.25816 313.086 1.31402 313.142 1.31402H314.371C314.427 1.31402 314.539 1.25816 314.594 1.25816H315.153C315.321 1.25816 315.488 1.31402 315.6 1.31402H315.935C316.047 1.31402 316.214 1.36987 316.326 1.36987H317.164C317.22 1.36987 317.276 1.31402 317.276 1.31402C317.387 1.25816 317.555 1.09059 317.667 1.09059C318.225 1.09059 318.337 1.48158 318.951 1.53744C319.286 1.53744 319.677 1.2023 320.236 1.31402C320.403 1.76086 322.191 1.64915 322.805 1.92843C323.643 1.98429 324.537 1.98429 325.375 1.92843C326.045 1.53744 325.71 1.98429 327.106 1.92843C328.112 1.87257 329.117 1.70501 330.122 1.48158C331.072 1.5933 331.016 1.53744 332.245 1.70501C332.412 1.70501 332.58 1.81672 332.692 1.92843C333.027 1.92843 333.139 1.70501 333.53 1.70501C333.697 1.70501 333.865 1.76086 333.976 1.92843C334.703 1.92843 334.926 1.76086 335.708 1.70501C338.221 1.53744 340.456 1.70501 342.578 1.25816C342.746 1.2023 343.36 1.31402 343.416 1.25816C344.03 0.923025 346.153 1.48158 346.879 1.03474C347.158 0.867169 347.214 0.643746 347.717 0.58789C348.499 0.58789 348.611 0.811313 349.449 0.811313C349.784 0.811313 350.175 0.476178 350.733 0.58789C350.845 0.58789 350.677 1.14645 351.18 1.03474C352.185 0.755457 353.135 0.978881 354.643 0.811313C354.978 0.755457 355.09 0.643746 355.481 0.58789H355.704L355.816 0.643746H356.095L356.766 0.58789C356.877 0.58789 356.933 0.58789 357.045 0.643746C357.157 0.699601 357.268 0.643746 357.436 0.699601H357.883Z"
                            fill="black"
                          />
                        </svg>
                        <svg
                          width="96"
                          style={{
                            position: "relative",
                            left: "-0.4rem",
                            top: "-0.37rem",
                          }}
                          height="3"
                          viewBox="0 0 97 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.405273 0.594727V2.99653L0.461129 2.88482H0.628697C0.740409 2.94067 0.796264 2.82896 0.907976 2.82896H1.01969C1.1314 2.82896 1.24311 2.88482 1.35482 2.88482H1.46653L1.57825 2.82896C1.6341 2.82896 1.74581 2.7731 1.80167 2.7731H3.70077L3.75662 2.71725V2.66139H3.81248C3.81248 2.66139 3.86834 2.66139 3.86834 2.60554L3.92419 2.54968H4.09176C4.25933 2.54968 4.48275 2.54968 4.65032 2.43797L4.87374 2.32626C4.98545 2.32626 5.04131 2.2704 5.15302 2.2704L5.26473 2.21455L5.37644 2.10283L5.4323 2.04698H5.71158C5.76743 2.04698 5.82329 1.99112 5.87915 1.99112H6.38185C6.71698 2.2704 7.16383 2.32626 7.66653 2.2704C8.3368 2.15869 8.61608 1.82356 9.62149 1.82356C10.571 1.99112 12.0791 1.82356 13.5873 1.99112C14.2575 2.10283 14.8719 2.21455 15.5422 2.2704C16.4918 2.15869 17.553 2.10283 18.5026 1.99112C19.117 1.99112 19.2845 2.2704 20.1224 2.2704C21.2954 2.21455 21.6305 1.7677 22.7476 1.65599C24.535 1.82356 24.9818 1.71184 26.7134 1.82356C26.6575 2.10283 27.1044 2.10283 27.3836 2.2704C27.4954 2.32626 27.2719 2.49383 27.3836 2.54968C27.4954 2.60554 28.1098 2.54968 28.0539 2.71725C29.7854 2.71725 31.0701 2.04698 32.6341 1.82356C33.2485 1.71184 33.9188 1.87941 34.5891 1.82356C35.4269 1.7677 35.7062 1.48842 36.544 1.37671C36.7116 1.60013 36.935 1.71184 37.2143 1.82356C37.326 1.65599 37.7728 1.48842 37.8845 1.65599C38.5548 1.65599 38.3314 1.265 39.1692 1.37671C39.8395 1.82356 40.5098 1.37671 41.4593 1.65599C42.1854 1.32085 42.9674 1.20914 43.7494 1.20914C43.8053 1.43256 43.6377 1.7677 44.0845 1.82356C44.8107 1.43256 44.9782 1.60013 45.3692 1.82356C46.5981 1.32085 48.3296 1.43256 49.6143 1.37671C49.9494 1.37671 49.8377 1.265 49.9494 1.20914C50.1728 1.20914 50.3963 1.265 50.6197 1.37671C50.9548 1.37671 50.7872 1.265 50.9548 1.20914C51.1782 1.20914 51.4017 1.265 51.6251 1.37671L52.9656 1.20914C53.6917 1.20914 54.4737 1.43256 55.2557 1.20914C55.7026 1.43256 57.1548 1.71184 56.2611 2.10283C57.1548 2.04698 57.9926 2.04698 58.8863 2.10283C59.1098 2.10283 59.2773 2.2704 59.2215 2.2704C59.5566 2.2704 59.8918 2.21455 60.2269 2.10283C60.6737 2.10283 61.1206 2.15869 61.5674 2.2704C61.4557 2.2704 61.8467 2.10283 61.9026 2.10283H62.2377C62.3494 2.10283 62.4611 2.04698 62.5728 1.93527C63.0197 1.93527 63.4665 1.99112 63.8575 2.10283C63.9134 2.10283 63.8017 1.82356 63.8575 1.82356C64.3044 1.7677 64.7512 1.7677 65.1981 1.82356C65.6449 1.87941 66.0918 1.87941 66.4827 1.82356C67.2089 1.82356 68.1026 1.65599 68.7728 1.65599C69.1638 1.65599 69.2755 1.82356 69.7782 1.82356C70.8953 1.82356 70.5602 1.54428 71.0629 1.82356C71.5098 1.93527 71.9566 1.93527 72.4035 1.99112C73.0179 1.99112 73.1296 1.82356 73.6881 1.82356C74.135 1.82356 74.135 1.99112 74.6936 1.99112C75.0287 1.99112 75.2521 1.87941 75.699 1.82356C77.4305 1.65599 79.2179 1.60013 80.9494 1.65599C81.508 1.71184 81.6197 1.82356 82.2341 1.82356C82.8485 1.82356 83.5188 1.54428 84.189 1.54428C84.971 1.48842 85.753 1.54428 86.535 1.65599C86.926 1.265 88.8251 1.48842 88.8251 1.48842C88.9368 1.48842 88.8251 1.32085 89.1602 1.32085C90.7242 1.265 91.6179 1.65599 92.4557 1.32085C92.9026 1.32085 92.735 1.60013 93.126 1.60013C93.2377 1.37671 93.8521 1.48842 94.1314 1.60013C94.5782 1.09743 97.4269 1.32085 98.3764 1.32085C98.544 1.32085 98.7674 1.15329 98.7116 1.15329C99.0467 1.15329 99.1026 1.32085 99.3818 1.32085C99.8845 1.32085 99.717 1.15329 100.052 1.32085C100.611 1.37671 101.169 1.37671 101.672 1.32085C102.51 1.32085 103.403 1.20914 104.241 1.15329H105.526C105.638 1.15329 105.805 1.15329 105.917 1.20914C106.308 1.43256 106.755 1.65599 107.202 1.82356C108.207 1.60013 108.486 1.87941 109.157 1.65599C109.492 1.7677 109.268 2.21455 110.162 2.10283C111.223 2.21455 111.167 1.87941 111.782 1.82356C112.676 2.21455 114.519 1.7677 115.412 1.65599C115.524 1.87941 116.139 1.82356 116.418 1.93527C116.306 1.60013 116.809 1.71184 117.423 1.65599C118.149 1.60013 119.211 1.43256 120.048 1.37671C120.495 1.43256 120.439 1.71184 120.719 1.82356C122.45 1.54428 124.238 1.54428 125.969 1.82356C126.416 1.7677 126.36 1.48842 126.639 1.37671C127.086 1.43256 127.533 1.37671 127.98 1.20914C127.98 1.60013 128.874 1.60013 129.265 1.82356C130.214 1.82356 131.164 1.99112 132.225 1.99112C132.56 1.99112 132.56 1.87941 132.895 1.82356C133.23 1.7677 133.566 1.82356 133.901 1.82356C134.18 1.82356 134.348 1.65599 134.571 1.65599C134.459 1.65599 134.794 1.82356 134.906 1.82356C135.856 1.93527 136.861 1.48842 137.867 1.65599C137.978 1.65599 138.034 1.93527 138.202 1.93527C138.593 1.99112 138.872 1.65599 139.486 1.7677C139.486 1.99112 140.101 1.82356 140.492 1.93527C140.771 1.99112 140.827 2.32626 141.497 2.21455C142.279 2.04698 143.843 1.71184 144.793 2.04698C145.239 1.60013 146.859 1.60013 147.753 1.60013C147.865 1.60013 147.976 1.65599 148.088 1.7677C148.703 1.82356 149.596 1.71184 150.043 1.7677C150.658 1.82356 150.769 2.04698 151.384 2.04698C152.501 2.04698 153.562 2.04698 154.679 1.87941C155.014 1.82356 155.349 1.82356 155.685 1.87941C156.913 1.99112 156.411 1.65599 157.025 1.60013C157.472 1.71184 157.081 2.15869 157.695 2.21455C158.421 1.87941 159.818 1.7677 161.326 1.7677C161.773 1.71184 161.494 1.99112 161.661 2.04698C161.94 2.15869 162.667 1.99112 162.667 2.21455C163.113 2.21455 163.56 2.10283 163.951 1.93527H164.621C165.18 1.93527 165.739 1.82356 166.241 1.65599C167.303 1.43256 167.358 1.65599 168.196 1.65599C168.643 1.65599 168.811 1.43256 169.481 1.48842C169.537 1.48842 169.984 1.65599 169.816 1.65599C170.375 1.65599 171.045 1.37671 171.771 1.48842C172.274 1.60013 172.05 1.71184 172.776 1.7677H173.112C173.223 1.7677 173.335 1.71184 173.447 1.60013C174.005 1.60013 173.949 1.87941 174.452 1.60013C174.843 1.37671 175.793 1.7677 176.072 1.7677C175.904 1.7677 176.407 1.60013 176.407 1.60013L177.077 1.43256C178.027 1.71184 179.032 1.87941 180.038 1.87941C180.317 1.87941 180.54 1.71184 180.708 1.71184C180.876 1.7677 180.652 2.04698 181.043 1.99112C180.987 1.99112 181.099 1.93527 181.099 1.93527C181.267 1.87941 181.434 1.82356 181.602 1.82356C181.713 1.82356 181.769 1.7677 181.881 1.7677C182.048 1.7677 182.16 1.82356 182.216 1.87941C182.328 1.93527 182.495 1.93527 182.495 1.99112C182.551 1.99112 182.551 2.10283 182.607 2.15869C182.663 2.21455 182.719 2.21455 182.775 2.2704C182.83 2.38211 182.886 2.49383 182.998 2.49383C183.11 2.49383 183.221 2.43797 183.333 2.43797C183.445 2.43797 183.557 2.32626 183.668 2.32626C183.836 2.2704 184.059 2.38211 184.227 2.32626L184.897 2.21455C185.512 2.10283 185.847 2.2704 186.182 2.04698C186.294 1.99112 186.74 2.04698 186.852 2.04698C187.131 1.87941 187.522 1.82356 187.857 1.87941C188.472 1.87941 188.863 2.10283 189.477 2.15869C189.812 2.15869 189.757 1.99112 189.812 1.99112C190.092 1.99112 190.092 2.15869 190.148 2.15869C190.874 2.15869 191.823 2.21455 192.103 2.15869C192.214 2.15869 192.549 1.99112 192.438 1.99112C193.555 1.93527 193.22 2.2704 193.778 1.99112C194.337 1.87941 194.895 1.82356 195.398 1.82356C196.068 1.71184 196.348 1.60013 197.018 1.54428C197.688 1.48842 198.47 1.60013 199.308 1.54428C199.643 1.54428 199.699 1.37671 199.978 1.37671C201.151 1.265 201.207 1.54428 201.933 1.54428C202.603 1.71184 203.162 1.99112 203.553 2.15869C203.721 2.21455 203.944 2.2704 204.112 2.2704L204.614 2.43797C204.894 2.49383 205.117 2.49383 205.396 2.49383C205.676 2.49383 205.843 2.2704 206.122 2.2704H206.681C207.016 2.32626 207.407 2.38211 207.742 2.49383C208.021 2.54968 208.301 2.54968 208.58 2.43797L209.194 2.2704C209.362 2.21455 209.53 2.21455 209.697 2.21455C209.921 2.15869 210.144 2.15869 210.423 2.10283C210.479 2.04698 210.591 2.04698 210.703 2.10283C210.814 2.15869 210.87 2.2704 210.982 2.38211C211.094 2.49383 211.205 2.60554 211.317 2.66139C211.373 2.71725 211.429 2.7731 211.54 2.82896C211.652 2.88482 211.764 2.88482 211.82 2.94067C211.931 2.99653 212.099 2.99653 212.266 2.99653C212.49 2.99653 212.713 2.94067 212.937 2.94067C213.048 2.94067 213.16 2.94067 213.216 2.88482C213.272 2.82896 213.272 2.71725 213.328 2.71725C213.384 2.71725 213.439 2.82896 213.551 2.7731C213.663 2.71725 213.551 2.54968 213.663 2.54968C213.775 2.54968 213.775 2.60554 213.942 2.60554C214.11 2.60554 214.277 2.66139 214.445 2.66139C214.501 2.66139 214.612 2.71725 214.668 2.66139C214.724 2.60554 214.724 2.54968 214.78 2.49383C214.948 2.32626 215.115 2.2704 215.339 2.2704C215.562 2.2704 215.785 2.2704 215.953 2.32626C216.065 2.38211 216.121 2.38211 216.232 2.38211C216.456 2.32626 216.679 2.21455 216.903 2.15869C217.238 2.10283 217.517 2.04698 217.852 2.04698C218.076 1.99112 218.299 2.04698 218.466 1.99112H218.746C218.857 1.99112 219.193 2.04698 219.248 2.10283V2.2704C219.248 2.38211 219.193 2.49383 219.304 2.60554C219.36 2.66139 219.472 2.71725 219.584 2.71725C219.751 2.71725 219.863 2.7731 220.03 2.82896C220.142 2.88482 220.477 2.94067 220.533 2.94067C220.589 2.94067 220.645 2.82896 220.757 2.82896C220.868 2.7731 220.98 2.7731 221.092 2.71725H221.427C221.594 2.7731 221.706 2.88482 221.93 2.88482C222.041 2.88482 222.153 2.88482 222.265 2.7731L222.6 2.60554L223.103 2.2704C223.27 2.15869 223.438 2.10283 223.605 2.10283H223.996L224.555 2.15869C225.057 2.21455 225.56 2.15869 226.007 1.99112C226.175 1.87941 226.342 1.82356 226.51 1.71184H226.789C226.901 1.71184 227.012 1.65599 227.18 1.65599C227.403 1.65599 227.627 1.60013 227.906 1.60013C228.074 1.60013 228.241 1.65599 228.409 1.71184C228.744 1.71184 229.023 1.71184 229.358 1.65599C229.749 1.60013 230.14 1.60013 230.531 1.65599H231.648C231.928 1.65599 232.207 1.71184 232.486 1.71184C232.821 1.7677 233.101 1.87941 233.38 1.99112C233.492 1.99112 233.603 2.04698 233.715 2.04698H234.609C234.721 2.10283 234.721 2.10283 234.832 2.04698C234.888 1.99112 234.944 1.93527 235 1.93527C235.112 1.87941 235.112 1.93527 235.223 1.99112C235.391 2.10283 235.558 2.10283 235.726 2.04698C235.782 1.99112 235.782 1.99112 235.782 1.93527C235.782 1.87941 235.782 1.87941 235.838 1.87941C236.005 1.7677 236.229 1.87941 236.34 2.04698C236.396 2.15869 236.396 2.2704 236.452 2.32626C236.508 2.38211 236.452 2.38211 236.508 2.38211L236.731 2.43797L237.011 2.49383C237.178 2.49383 237.346 2.54968 237.513 2.66139C237.625 2.7731 237.625 2.82896 237.793 2.82896C237.904 2.82896 238.016 2.7731 238.128 2.7731C238.239 2.7731 238.239 2.82896 238.407 2.82896C238.575 2.82896 238.798 2.7731 238.966 2.82896C239.077 2.82896 239.133 2.88482 239.245 2.88482C239.357 2.88482 239.468 2.94067 239.58 2.88482C240.194 2.82896 240.585 2.71725 241.256 2.71725C241.758 2.71725 242.317 2.82896 242.876 2.88482C243.657 2.94067 244.439 2.94067 245.277 2.94067H246.283C246.45 2.94067 246.618 2.94067 246.785 2.99653C246.897 3.05238 246.953 3.10824 247.065 3.10824C247.232 3.10824 247.4 3.1641 247.567 3.1641H248.014C248.126 3.1641 248.238 3.1641 248.349 3.10824C248.405 3.10824 248.405 3.05238 248.461 2.99653C248.517 2.94067 248.517 2.94067 248.629 2.94067C248.74 2.94067 248.852 2.88482 248.964 2.88482C249.243 2.82896 249.578 2.88482 249.802 2.82896C250.025 2.82896 250.193 2.82896 250.36 2.66139L250.528 2.49383C250.584 2.43797 250.584 2.38211 250.639 2.38211H250.807C250.863 2.38211 250.975 2.32626 251.03 2.32626H251.645C251.757 2.32626 251.868 2.2704 251.98 2.2704H252.148C252.148 2.2704 252.203 2.2704 252.203 2.21455C252.259 2.21455 252.371 2.2704 252.427 2.2704C252.594 2.32626 252.762 2.32626 252.93 2.38211C252.985 2.38211 253.041 2.43797 253.041 2.43797C253.153 2.43797 253.265 2.43797 253.376 2.38211C253.488 2.32626 253.544 2.32626 253.656 2.32626C253.712 2.32626 253.823 2.32626 253.879 2.38211C254.047 2.43797 254.214 2.43797 254.382 2.38211C254.829 2.32626 255.275 2.32626 255.722 2.43797C255.778 2.43797 255.834 2.49383 255.89 2.49383C255.946 2.49383 255.946 2.60554 256.002 2.60554H256.616C256.784 2.60554 256.951 2.71725 257.119 2.71725C257.23 2.71725 257.286 2.66139 257.342 2.66139H257.566C257.845 2.71725 258.18 2.71725 258.515 2.7731C258.739 2.82896 259.018 2.82896 259.241 2.7731C259.409 2.71725 259.521 2.66139 259.688 2.60554C259.967 2.54968 260.191 2.54968 260.47 2.49383H262.928C263.43 2.43797 263.989 2.54968 264.548 2.49383C264.994 2.43797 265.441 2.38211 265.832 2.32626C266.503 2.32626 266.391 2.54968 267.173 2.60554C267.005 2.60554 267.452 2.43797 267.508 2.43797C269.072 2.2704 268.402 2.94067 269.128 2.60554C270.021 2.21455 270.189 2.94067 270.748 2.60554C270.915 2.49383 271.139 2.7731 271.083 2.7731C272.591 2.88482 274.155 2.88482 275.663 2.7731C276.221 2.71725 276.78 2.7731 277.339 2.7731C277.562 2.7731 277.339 2.60554 277.674 2.7731C277.841 2.88482 278.065 2.60554 278.009 2.60554C278.623 2.60554 278.735 2.7731 279.294 2.7731C279.182 2.7731 279.517 2.60554 279.629 2.60554C280.802 2.43797 281.584 2.82896 282.254 2.88482C284.153 2.99653 284.712 2.60554 285.885 2.60554C287.002 2.60554 288.007 2.71725 289.18 2.7731C290.297 2.82896 291.303 2.71725 292.475 2.7731C292.922 2.7731 292.866 2.88482 293.481 2.94067C294.095 2.99653 294.654 2.71725 295.212 2.82896C295.603 2.88482 295.939 2.88482 296.33 2.82896C296.609 2.7731 296.888 2.71725 297.167 2.60554L297.503 2.43797C297.894 2.2704 298.34 2.21455 298.731 2.21455L299.793 2.15869C299.96 2.15869 300.128 2.15869 300.239 2.10283L300.575 1.93527C300.686 1.87941 300.798 1.82356 300.91 1.82356C301.021 1.82356 301.133 1.93527 301.245 1.99112C301.357 2.04698 301.468 2.04698 301.636 2.04698H301.915C302.027 1.99112 302.139 1.93527 302.194 1.87941C302.306 1.82356 302.474 1.82356 302.585 1.82356C302.697 1.82356 302.753 1.7677 302.865 1.7677H305.211C305.378 1.7677 305.49 1.71184 305.657 1.71184C305.713 1.71184 305.713 1.65599 305.825 1.71184C305.993 1.7677 306.104 1.99112 306.272 2.04698H306.384C306.495 2.04698 306.607 2.04698 306.663 2.10283C306.775 2.15869 306.886 2.10283 306.942 2.15869C307.11 2.21455 307.277 2.2704 307.389 2.32626H307.557C307.612 2.32626 307.612 2.43797 307.668 2.43797C307.892 2.54968 308.171 2.32626 308.339 2.32626C309.567 2.32626 310.74 2.43797 311.969 2.60554C312.528 2.66139 313.533 2.71725 314.259 2.7731C314.594 2.71725 314.93 2.71725 315.265 2.60554C315.544 2.60554 315.879 2.94067 315.935 2.7731C315.991 2.60554 316.717 2.60554 316.94 2.49383C316.884 2.54968 316.996 2.60554 316.996 2.60554C317.108 2.66139 317.22 2.66139 317.275 2.66139H317.834C317.946 2.71725 317.946 2.7731 318.002 2.82896C318.113 2.88482 318.281 2.88482 318.337 2.88482C318.393 2.88482 318.448 2.94067 318.448 2.94067C318.448 2.99653 318.393 3.05238 318.448 3.10824H318.728C318.839 3.10824 318.951 3.10824 319.063 3.05238C319.175 2.99653 319.23 3.05238 319.286 2.99653C319.342 2.99653 319.342 2.88482 319.398 2.88482C319.454 2.88482 319.51 2.82896 319.51 2.82896C319.566 2.82896 319.677 2.88482 319.733 2.88482C319.845 2.94067 319.957 2.94067 320.068 2.94067C320.292 2.94067 320.459 2.88482 320.683 2.88482C320.794 2.88482 321.018 2.94067 321.13 2.82896C321.185 2.71725 321.13 2.60554 321.018 2.60554C321.074 2.49383 321.241 2.54968 321.353 2.54968C321.521 2.60554 321.688 2.66139 321.856 2.66139C321.967 2.60554 322.023 2.49383 322.023 2.43797C322.023 2.38211 321.967 2.38211 321.911 2.32626C321.911 2.2704 321.912 2.15869 321.967 2.15869C322.023 2.15869 322.247 2.21455 322.247 2.15869V1.99112C322.247 1.93527 322.247 1.87941 322.303 1.87941C322.358 1.87941 322.414 1.93527 322.47 1.93527H322.694C322.805 1.93527 322.805 1.82356 322.861 1.82356C322.973 1.7677 323.085 1.7677 323.196 1.82356C323.308 1.82356 323.42 1.87941 323.531 1.93527C323.587 1.93527 323.643 1.99112 323.699 2.04698C323.866 2.15869 324.09 2.15869 324.257 2.10283C324.313 2.04698 324.425 2.04698 324.537 2.04698C324.648 2.04698 324.648 2.04698 324.648 1.93527C324.648 1.87941 324.648 1.7677 324.704 1.71184C324.816 1.60013 324.816 1.65599 324.984 1.7677C325.151 1.87941 325.375 1.82356 325.542 1.82356C326.101 1.93527 326.715 1.93527 327.33 1.93527H328.056C328.167 1.93527 328.335 1.87941 328.391 1.7677C328.726 1.7677 328.782 1.93527 329.061 1.93527C329.508 1.93527 329.508 1.71184 330.066 1.7677C330.066 2.04698 330.904 1.82356 331.351 1.93527C331.854 1.99112 332.077 2.32626 332.636 2.21455C332.692 2.10283 332.636 1.93527 332.971 1.93527C333.641 2.32626 335.708 2.32626 336.602 2.21455C337.439 2.66139 339.283 2.54968 340.232 2.66139C340.344 2.66139 340.679 2.82896 340.567 2.82896C341.461 2.82896 342.243 2.54968 343.193 2.66139C343.975 2.88482 345.315 2.88482 346.153 3.10824C346.097 2.82896 346.488 2.7731 347.158 2.82896C347.884 3.05238 349.616 2.82896 349.784 3.27581C350.733 3.21995 350.957 2.99653 351.403 3.27581C351.571 3.38752 351.794 3.10824 351.739 3.10824H353.358C353.582 3.10824 353.414 2.94067 353.694 3.10824C353.973 3.27581 354.922 2.94067 354.978 2.94067C355.481 2.94067 355.313 3.10824 355.648 2.94067H356.319C356.43 2.94067 356.486 2.94067 356.598 2.88482C356.654 2.82896 356.654 2.82896 356.71 2.82896H357.212L357.324 2.88482H357.492C357.548 2.88482 357.603 2.88482 357.659 2.94067H358.05V0.594727H0.405273Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          width="96"
                          height="4"
                          style={{
                            position: "relative",
                            top: "-0.7rem",
                            left: "-0.35rem",
                          }}
                          viewBox="0 0 96 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_198_1433)">
                            <path
                              d="M0.0927734 2.4872V0.811523C2.88557 0.811523 2.88557 1.92864 5.67836 1.92864C8.47115 1.92864 8.47115 0.811523 11.2639 0.811523C14.0567 0.811523 14.0567 1.92864 16.8495 1.92864C19.6423 1.92864 19.6423 0.811523 22.4351 0.811523C25.2279 0.811523 25.2279 1.92864 28.0207 1.92864C30.8135 1.92864 30.8135 0.811523 33.6063 0.811523C36.3991 0.811523 36.3991 1.92864 39.1919 1.92864C41.9847 1.92864 41.9847 0.811523 44.7775 0.811523C47.5702 0.811523 47.5702 1.92864 50.363 1.92864C53.1558 1.92864 53.1558 0.811523 55.9486 0.811523C58.7973 0.811523 58.7973 1.92864 61.5342 1.92864C64.327 1.92864 64.327 0.811523 67.1198 0.811523H67.1757C69.9684 0.811523 69.9684 1.92864 72.7054 1.92864C75.4982 1.92864 75.4982 0.811523 78.291 0.811523H78.3468C81.1396 0.811523 81.1396 1.92864 83.8765 1.92864C86.6693 1.92864 86.6693 0.811523 89.4621 0.811523H89.518C92.3108 0.811523 92.3108 1.92864 95.0477 1.92864C97.8405 1.92864 97.8405 0.811523 100.633 0.811523H100.689C103.482 0.811523 103.482 1.92864 106.219 1.92864C109.012 1.92864 109.012 0.811523 111.804 0.811523H111.86C114.653 0.811523 114.653 1.92864 117.39 1.92864C120.183 1.92864 120.183 0.811523 122.976 0.811523H123.032C125.824 0.811523 125.824 1.92864 128.561 1.92864C131.354 1.92864 131.354 0.811523 134.147 0.811523H134.203C136.995 0.811523 136.995 1.92864 139.732 1.92864C142.525 1.92864 142.525 0.811523 145.318 0.811523H145.374C148.167 0.811523 148.167 1.92864 150.904 1.92864C153.696 1.92864 153.696 0.811523 156.489 0.811523H156.545C159.338 0.811523 159.338 1.92864 162.075 1.92864C164.868 1.92864 164.868 0.811523 167.66 0.811523H167.716C170.509 0.811523 170.509 1.92864 173.246 1.92864C176.039 1.92864 176.039 0.811523 178.831 0.811523H178.887C181.68 0.811523 181.68 1.92864 184.417 1.92864C187.21 1.92864 187.21 0.811523 190.003 0.811523H190.059C192.851 0.811523 192.851 1.92864 195.588 1.92864C198.381 1.92864 198.381 0.811523 201.174 0.811523H201.23C204.022 0.811523 204.022 1.92864 206.759 1.92864C209.552 1.92864 209.552 0.811523 212.345 0.811523H212.401C215.194 0.811523 215.194 1.92864 217.931 1.92864H217.986C220.779 1.92864 220.779 0.811523 223.572 0.811523C226.365 0.811523 226.365 1.92864 229.158 1.92864C231.95 1.92864 231.95 0.811523 234.743 0.811523C237.536 0.811523 237.536 1.92864 240.329 1.92864C243.122 1.92864 243.122 0.811523 245.914 0.811523C248.707 0.811523 248.707 1.92864 251.5 1.92864C254.293 1.92864 254.293 0.811523 257.086 0.811523C259.878 0.811523 259.878 1.92864 262.671 1.92864C265.464 1.92864 265.464 0.811523 268.257 0.811523C271.05 0.811523 271.05 1.92864 273.842 1.92864C276.635 1.92864 276.635 0.811523 279.428 0.811523C282.221 0.811523 282.221 1.92864 285.013 1.92864C287.806 1.92864 287.806 0.811523 290.599 0.811523C293.392 0.811523 293.392 1.92864 296.185 1.92864C298.977 1.92864 298.977 0.811523 301.77 0.811523C304.563 0.811523 304.563 1.92864 307.356 1.92864C310.149 1.92864 310.149 0.811523 312.941 0.811523C315.734 0.811523 315.734 1.92864 318.527 1.92864C321.32 1.92864 321.32 0.811523 324.113 0.811523C326.905 0.811523 326.905 1.92864 329.698 1.92864C332.491 1.92864 332.491 0.811523 335.284 0.811523C338.077 0.811523 338.077 1.92864 340.869 1.92864C343.662 1.92864 343.662 0.811523 346.455 0.811523C349.248 0.811523 349.248 1.92864 352.04 1.92864C354.833 1.92864 354.833 0.811523 357.626 0.811523V2.4872H0.0927734Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_198_1433">
                              <rect
                                width="6.5rem"
                                height="2.23423"
                                fill="white"
                                transform="translate(0.0927734 0.811523)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          width="96"
                          height="4"
                          style={{
                            position: "relative",
                            top: "-0.3rem",
                            left: "-0.35rem",
                          }}
                          viewBox="0 0 96 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M357.57 0.0361328V1.71181C354.777 1.71181 354.777 0.594691 351.985 0.594691C349.192 0.594691 349.192 1.71181 346.399 1.71181C343.606 1.71181 343.606 0.594691 340.813 0.594691C338.021 0.594691 338.021 1.71181 335.228 1.71181C332.435 1.71181 332.435 0.594691 329.642 0.594691C326.85 0.594691 326.85 1.71181 324.057 1.71181C321.264 1.71181 321.264 0.594691 318.471 0.594691C315.678 0.594691 315.678 1.71181 312.886 1.71181C310.093 1.71181 310.093 0.594691 307.3 0.594691C304.507 0.594691 304.507 1.71181 301.714 1.71181C298.866 1.71181 298.866 0.594691 296.129 0.594691C293.336 0.594691 293.336 1.71181 290.543 1.71181H290.487C287.695 1.71181 287.695 0.594691 284.958 0.594691C282.165 0.594691 282.165 1.71181 279.372 1.71181H279.316C276.523 1.71181 276.523 0.594691 273.786 0.594691C270.994 0.594691 270.994 1.71181 268.201 1.71181H268.145C265.352 1.71181 265.352 0.594691 262.615 0.594691C259.822 0.594691 259.822 1.71181 257.03 1.71181H256.974C254.181 1.71181 254.181 0.594691 251.444 0.594691C248.651 0.594691 248.651 1.71181 245.859 1.71181H245.803C243.01 1.71181 243.01 0.594691 240.273 0.594691C237.48 0.594691 237.48 1.71181 234.687 1.71181H234.632C231.839 1.71181 231.839 0.594691 229.102 0.594691C226.309 0.594691 226.309 1.71181 223.516 1.71181H223.46C220.668 1.71181 220.668 0.594691 217.931 0.594691C215.138 0.594691 215.138 1.71181 212.345 1.71181H212.289C209.496 1.71181 209.496 0.594691 206.759 0.594691C203.967 0.594691 203.967 1.71181 201.174 1.71181H201.118C198.325 1.71181 198.325 0.594691 195.588 0.594691C192.795 0.594691 192.795 1.71181 190.003 1.71181H189.947C187.154 1.71181 187.154 0.594691 184.417 0.594691C181.624 0.594691 181.624 1.71181 178.831 1.71181H178.776C175.983 1.71181 175.983 0.594691 173.246 0.594691C170.453 0.594691 170.453 1.71181 167.66 1.71181H167.604C164.812 1.71181 164.812 0.594691 162.075 0.594691C159.282 0.594691 159.282 1.71181 156.489 1.71181H156.433C153.641 1.71181 153.641 0.594691 150.904 0.594691C148.111 0.594691 148.111 1.71181 145.318 1.71181H145.262C142.469 1.71181 142.469 0.594691 139.732 0.594691H139.677C136.884 0.594691 136.884 1.71181 134.091 1.71181C131.298 1.71181 131.298 0.594691 128.505 0.594691C125.713 0.594691 125.713 1.71181 122.92 1.71181C120.127 1.71181 120.127 0.594691 117.334 0.594691C114.541 0.594691 114.541 1.71181 111.749 1.71181C108.956 1.71181 108.956 0.594691 106.163 0.594691C103.37 0.594691 103.37 1.71181 100.577 1.71181C97.7847 1.71181 97.7847 0.594691 94.9919 0.594691C92.1991 0.594691 92.1991 1.71181 89.4063 1.71181C86.6135 1.71181 86.6135 0.594691 83.8207 0.594691C81.0279 0.594691 81.0279 1.71181 78.2351 1.71181C75.4423 1.71181 75.4423 0.594691 72.6495 0.594691C69.8567 0.594691 69.8567 1.71181 67.0639 1.71181C64.2711 1.71181 64.2711 0.594691 61.4784 0.594691C58.6856 0.594691 58.6856 1.71181 55.8928 1.71181C53.1 1.71181 53.1 0.594691 50.3072 0.594691C47.5144 0.594691 47.5144 1.71181 44.7216 1.71181C41.9288 1.71181 41.9288 0.594691 39.136 0.594691C36.3432 0.594691 36.3432 1.71181 33.5504 1.71181C30.7576 1.71181 30.7576 0.594691 27.9648 0.594691C25.1721 0.594691 25.1721 1.71181 22.3793 1.71181C19.5865 1.71181 19.5865 0.594691 16.7937 0.594691C14.0009 0.594691 14.0009 1.71181 11.2081 1.71181C8.4153 1.71181 8.4153 0.594691 5.6225 0.594691C2.82971 0.594691 2.88557 1.71181 0.0927734 1.71181V0.0361328H357.57Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                      <button></button>
                    </div>
                    <div className={styles.btnRow52}>
                      <button
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            buttonStyle: {
                              ...prevData.buttonStyle,
                              bgColor: "#000000",
                              boxShadow: "0px 2.23px 2.23px 0px #00000029",
                              border: "none",
                              borderRadius: "0.85rem",
                              bgFontColor: "#ffffff",
                            },
                          }));
                        }}
                        style={{
                          borderRadius: "0.85rem",
                          boxShadow: "0px 2.23px 4.47px 0px #00000029",
                        }}
                      ></button>
                      <button
                        style={{
                          backgroundColor: "white",
                          display: "grid",
                          placeItems: "center",
                          gridTemplateColumns: "50% 50%",
                          gridTemplateRows: "50% 50%",
                          border: "0.56px solid #000000",
                        }}
                      >
                        <span
                          className={styles.box}
                          style={{
                            left: "-63%",
                            top: "-50%",
                          }}
                        ></span>
                        <span
                          className={styles.box}
                          style={{
                            left: "64%",
                            top: "-50%",
                          }}
                        ></span>
                        <span
                          className={styles.box}
                          style={{
                            left: "-63%",
                            top: "50%",
                          }}
                        ></span>
                        <span
                          className={styles.box}
                          style={{
                            left: "64%",
                            top: "50%",
                          }}
                        ></span>
                      </button>
                      <button
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            buttonStyle: {
                              ...prevData.buttonStyle,
                              bgColor: "#000000",
                              boxShadow: "",
                              border: "none",
                              borderRadius: "0.85rem 0 0 0.85rem",
                              bgFontColor: "#ffffff",
                            },
                          }));
                        }}
                        style={{
                          borderRadius: "0.85rem 0 0 0.85rem",
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label style={{ fontWeight: "600" }}>Button color</label>
                  <div className={styles.selectColor}>
                    <div
                      style={{
                        backgroundColor:
                          formData.buttonStyle.bgColor !== "#ffffff" &&
                          formData.buttonStyle.bgColor !== ""
                            ? formData.buttonStyle.bgColor
                            : "#ffffff",
                      }}
                      className={styles.bginputColor}
                    ></div>
                    <div className={styles.bgInput}>
                      <input
                        id="buttonBgCustomInput"
                        type="text"
                        value={
                          formData.buttonStyle.bgColor
                            ? formData.buttonStyle.bgColor
                            : "#ffffff"
                        }
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            buttonStyle: {
                              ...prevData.buttonStyle,
                              bgColor: e.target.value,
                            },
                          }));
                        }}
                      />
                      <label htmlFor="buttonBgCustomInput">Button color</label>
                    </div>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label style={{ fontWeight: "600" }}>Button font color</label>
                  <div className={styles.selectColor}>
                    <div
                      style={{
                        backgroundColor:
                          formData.buttonStyle.fontColor !== "#888888" &&
                          formData.buttonStyle.fontColor !== ""
                            ? formData.buttonStyle.fontColor
                            : "#888888",
                      }}
                      className={styles.bginputColor}
                    ></div>
                    <div className={styles.bgInput}>
                      <input
                        id="buttonFontColorCustomInput"
                        type="text"
                        value={
                          formData.buttonStyle.fontColor
                            ? formData.buttonStyle.fontColor
                            : "#888888"
                        }
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            buttonStyle: {
                              ...prevData.buttonStyle,
                              fontColor: e.target.value,
                            },
                          }));
                        }}
                      />
                      <label htmlFor="buttonFontColorCustomInput">
                        Button font color
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.layouts}>
              <label>Fonts</label>
              <div className={styles.styling}>
                <div className={styles.btnStyle}>
                  <label style={{ fontWeight: "600" }}>Font</label>
                  <div className={styles.ffInput}>
                    <input
                      id="ffInput"
                      defaultValue="DM Sans"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          buttonStyle: {
                            ...prevData.buttonStyle,
                            fontFamily: e.target.value,
                          },
                        }));
                      }}
                    />
                    <div
                      htmlFor="ffInput"
                      style={{
                        width: "1.7rem",
                        height: "1.7rem",
                        fontFamily: formData.buttonStyle.fontFamily,
                      }}
                    >
                      Aa
                    </div>
                  </div>
                </div>
                <div className={styles.btnStyle}>
                  <label style={{ fontWeight: "600" }}>Color</label>
                  <div className={styles.selectColor}>
                    <div
                      style={{
                        backgroundColor: formData.buttonStyle.fontColor,
                      }}
                      className={styles.bginputColor}
                    ></div>
                    <div className={styles.bgInput}>
                      <input
                        id="fontColorCustomInput"
                        type="text"
                        style={{
                          backgroundColor: !isMobile ? "#f3f3f1" : "#ffffff",
                        }}
                        value={
                          formData.buttonStyle.fontColor !== ""
                            ? formData.buttonStyle.fontColor
                            : "#ffffff"
                        }
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            buttonStyle: {
                              ...prevData.buttonStyle,
                              fontColor: e.target.value,
                            },
                          }));
                        }}
                      />
                      <label htmlFor="fontColorCustomInput">Color</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.layouts}>
              <label>Themes</label>
              <div className={styles.styling}>
                <div className={styles.themecontent}>
                  {themes.map((theme, index) => (
                    <div
                      className={`${styles.themelist} ${
                        selectedTheme === theme.title
                          ? styles.selectedTheme
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedTheme(theme.title);
                        setFormData((prevData) => ({
                          ...prevData,
                          themes: {
                            ...prevData.themes,
                            bgColor: theme.bgColor,
                          },
                        }));
                      }}
                      key={index}
                    >
                      <img src={theme.image} />
                      <span>{theme.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.saveBtn}>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                  setSaveBtnClicked(true);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div
          className={styles.preview}
          style={{ display: !isMobile ? "none" : "" }}
        >
          <button
            onClick={() => {
              setIsPreviewOpen(true);
            }}
          >
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.945949 7.15642C1.78675 8.62298 4.15635 12.033 8.00035 12.033C11.8507 12.033 14.2163 8.62136 15.0563 7.15642C15.1708 6.95728 15.2311 6.73081 15.2309 6.50022C15.2308 6.26963 15.1703 6.04323 15.0555 5.84423C14.2155 4.37848 11.8475 0.966797 8.00035 0.966797C4.15315 0.966797 1.78595 4.37686 0.945949 5.84261C0.831064 6.04187 0.770508 6.26861 0.770508 6.49952C0.770508 6.73042 0.831064 6.95716 0.945949 7.15642Z"
                stroke="black"
                strokeOpacity="0.75"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <path
                d="M8.00039 8.63281C8.55735 8.63281 9.09149 8.40811 9.48531 8.00813C9.87914 7.60815 10.1004 7.06566 10.1004 6.5C10.1004 5.93434 9.87914 5.39185 9.48531 4.99187C9.09149 4.59189 8.55735 4.36719 8.00039 4.36719C7.44344 4.36719 6.90929 4.59189 6.51547 4.99187C6.12164 5.39185 5.90039 5.93434 5.90039 6.5C5.90039 7.06566 6.12164 7.60815 6.51547 8.00813C6.90929 8.40811 7.44344 8.63281 8.00039 8.63281Z"
                stroke="black"
                strokeOpacity="0.75"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
            Preview
          </button>
        </div>
      </div>
      {isPreviewOpen && isMobile && (
        <Preview onClose={() => setIsPreviewOpen(false)} />
      )}
    </>
  );
};

export default Appearance;
