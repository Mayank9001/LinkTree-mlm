import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./styles/Appearance.module.css";
import Spark from "../assets/Spark.png";
import Boy from "../assets/Boy.png";

const Appearance = () => {
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [selectedlayout, setSelectedLayout] = useState("stack");

  const active = {
    isLinks: false,
    isAppearance: true,
    isAnalytics: false,
    isSettings: false,
  };
  return (
    <>
      <Navbar active={active} />
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Spark} className={styles.logo} alt="logo" />
          <img
            src={Boy}
            alt="profile"
            className={styles.pic}
            onClick={() => setLogoutVisible((prev) => !prev)}
          />
          <div className={styles.logout}>
            {logoutVisbile && (
              <button
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
          <div className={styles.layouts}>
            <label>Layout</label>
            <div className={styles.layout}>
              <div className={styles.types}>
                <button
                  onClick={() => setSelectedLayout("stack")}
                  style={{
                    backgroundColor: selectedlayout === "stack" && "#FFFFFF",
                    border: selectedlayout === "stack" && "none",
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
                  onClick={() => setSelectedLayout("grid")}
                  style={{
                    backgroundColor: selectedlayout === "grid" && "#FFFFFF",
                    border: selectedlayout === "grid" && "none",
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
                  onClick={() => setSelectedLayout("carousel")}
                  style={{
                    backgroundColor: selectedlayout === "carousel" && "#FFFFFF",
                    border: selectedlayout === "carousel" && "none",
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
                  <button></button>
                  <button
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
                  <button></button>
                  <button
                    style={{ borderRadius: "0.3rem", marginLeft: "0.2rem" }}
                  ></button>
                  <button style={{ borderRadius: "0.85rem" }}></button>
                </div>
              </div>
              <div className={styles.btnStyle}>
                <label>Hard Shadow</label>
                <div className={styles.btnRow3}>
                  <button></button>
                  <button style={{ borderRadius: "0.3rem" }}></button>
                  <button style={{ borderRadius: "0.85rem" }}></button>
                </div>
              </div>
              <div className={styles.btnStyle}>
                <label>Soft Shadow</label>
                <div className={styles.btnRow4}>
                  <button></button>
                  <button style={{ borderRadius: "0.3rem" }}></button>
                  <button style={{ borderRadius: "0.85rem" }}></button>
                </div>
              </div>
              <div className={styles.btnStyle}>
                <label>Special</label>
                <div className={styles.btnRow}>
                  <button></button>
                  <button></button>
                  <button></button>
                  <button></button>
                  <button></button>
                  <button></button>
                </div>
              </div>
              <div className={styles.btnStyle}>
                <label>Button color</label>
              </div>
              <div className={styles.btnStyle}>
                <label>Button font color</label>
              </div>
            </div>
          </div>
          <div className="">Fonts</div>
          <div className="">Themes</div>
          <div className={styles.saveBtn}>
            <button>Save</button>
          </div>
        </div>
        <div className={styles.preview}>
          <button>
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
    </>
  );
};

export default Appearance;
