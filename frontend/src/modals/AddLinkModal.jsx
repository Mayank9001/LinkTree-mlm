import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/AddLinkModal.module.css";
import { createLink } from "../services/link.services";
import { toast } from "react-toastify";
import useMobile from "../components/hooks/useIsMobile";
import Instagram from "../assets/svgs/Instagram.svg";
import FaceBook from "../assets/svgs/FaceBook.svg";
import YouTube from "../assets/svgs/YouTube.svg";
import X from "../assets/svgs/X.svg";
const AddLinkModal = ({ onClose, profileId }) => {
  const modalRef = useRef(null);
  const isMobile = useMobile();
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [isAppSelected, setIsAppSelected] = useState("");
  const apps = [
    {
      title: "Instagram",
      svg: Instagram,
    },
    {
      title: "FaceBook",
      svg: FaceBook,
    },
    {
      title: "YouTube",
      svg: YouTube,
    },
    {
      title: "X",
      svg: X,
    },
  ];
  const ToggleIcon = ({ isActive }) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_222_712)">
        <path
          d="M2.11816 5.96143V11.0222C2.11816 11.3204 2.23665 11.6065 2.44755 11.8174C2.65846 12.0283 2.94451 12.1468 3.24277 12.1468H11.115C11.4133 12.1468 11.6994 12.0283 11.9103 11.8174C12.1212 11.6065 12.2397 11.3204 12.2397 11.0222V5.96143"
          stroke={isActive ? "#FFFFFF" : "#6C6C6C"}
          strokeWidth="0.843458"
        />
        <path
          d="M8.77227 12.1469V8.77305C8.77227 8.47478 8.65378 8.18873 8.44288 7.97783C8.23197 7.76692 7.94592 7.64844 7.64766 7.64844H6.52305C6.22478 7.64844 5.93873 7.76692 5.72783 7.97783C5.51692 8.18873 5.39844 8.47478 5.39844 8.77305V12.1469"
          stroke={isActive ? "#FFFFFF" : "#6C6C6C"}
          strokeWidth="0.843458"
          strokeMiterlimit="16"
        />
        <path
          d="M12.6996 5.6039L11.7471 2.26999C11.7269 2.19951 11.6843 2.13751 11.6258 2.09337C11.5673 2.04924 11.4959 2.02537 11.4226 2.02539H9.14697L9.41407 5.23278C9.4182 5.28433 9.43452 5.33416 9.4617 5.37816C9.48888 5.42215 9.52614 5.45906 9.57039 5.48582C9.78969 5.61683 10.2182 5.85863 10.5527 5.96153C11.124 6.13753 11.9585 6.07399 12.4342 6.01551C12.4805 6.00953 12.5248 5.99353 12.5643 5.96863C12.6037 5.94373 12.6372 5.91052 12.6625 5.87133C12.6878 5.83214 12.7042 5.78791 12.7106 5.74172C12.717 5.69553 12.7133 5.6485 12.6996 5.6039Z"
          stroke={isActive ? "#FFFFFF" : "#6C6C6C"}
          strokeWidth="0.843458"
        />
        <path
          d="M8.3036 5.96153C8.62299 5.86312 9.02785 5.63876 9.25389 5.50494C9.30649 5.47347 9.34916 5.42782 9.37701 5.37322C9.40486 5.31862 9.41676 5.25728 9.41134 5.19623L9.14706 2.02539H5.21092L4.94664 5.19623C4.94111 5.25737 4.95296 5.31883 4.98081 5.37354C5.00866 5.42825 5.05139 5.47399 5.10408 5.5055C5.33013 5.63876 5.73499 5.86312 6.05438 5.96153C6.8939 6.22019 7.46408 6.22019 8.3036 5.96153Z"
          stroke={isActive ? "#FFFFFF" : "#6C6C6C"}
          strokeWidth="0.843458"
        />
        <path
          d="M2.61076 2.26999L1.65822 5.60446C1.64477 5.64899 1.64118 5.6959 1.64768 5.74196C1.65419 5.78801 1.67064 5.83209 1.69589 5.87115C1.72114 5.9102 1.7546 5.9433 1.79392 5.96813C1.83325 5.99296 1.87751 6.00894 1.92362 6.01495C2.39877 6.07399 3.2338 6.13697 3.8051 5.96153C4.13967 5.85863 4.56871 5.61683 4.78745 5.48638C4.83177 5.45956 4.86907 5.42257 4.89625 5.37847C4.92344 5.33437 4.93972 5.28443 4.94377 5.23278L5.21086 2.02539H2.93521C2.8619 2.02537 2.79058 2.04924 2.73203 2.09337C2.67349 2.13751 2.63092 2.19951 2.61076 2.26999Z"
          stroke={isActive ? "#FFFFFF" : "#6C6C6C"}
          strokeWidth="0.843458"
        />
      </g>
      <defs>
        <clipPath id="clip0_222_712">
          <rect
            width="13.4953"
            height="13.4953"
            fill={isActive ? "#FFFFFF" : "#6C6C6C"}
            transform="translate(0.431641 0.338379)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const [linkData, setLinkData] = useState({
    linkTitle: "",
    linkUrl: "",
    linkType: "app",
    appType: "",
    show: false,
    profileId: profileId,
  });
  const saveLink = async () => {
    const res = await createLink(linkData);
    const data = await res.json();
    if (data.status === 200) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        saveLink();
        toast.success("link added succesfully");
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, linkData]);
  return (
    <>
      <div className={styles.main}>
        <div
          className={styles.container}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.toggleContainer}>
            <span
              onClick={() => {
                setLinkData({ ...linkData, linkType: "app" });
                setIsLinkActive(true);
              }}
              className={isLinkActive ? styles.active : styles.inactive}
            >
              <ToggleIcon isActive={isLinkActive} />
              Add Link
            </span>
            <span
              onClick={() => {
                setIsLinkActive(false);
                setLinkData({ ...linkData, linkType: "shop" });
              }}
              className={!isLinkActive ? styles.active : styles.inactive}
            >
              <ToggleIcon isActive={!isLinkActive} />
              Add Shop
            </span>
          </div>
          <div
            className={styles.linkDetails}
            style={{ marginBottom: isLinkActive ? "5.3rem" : "1.4rem" }}
          >
            <span>Enter URL</span>
            <div
              className={styles.enterLink}
              style={{ marginBottom: !isLinkActive ? "1rem" : "" }}
            >
              <div className={styles.linkTitle}>
                <div className={styles.inputtitle}>
                  {/* <label>Link Title</label> */}
                  <input
                    placeholder="Link Title"
                    onChange={(e) =>
                      setLinkData({ ...linkData, linkTitle: e.target.value })
                    }
                  ></input>
                </div>
                <div className={styles.togglediv}>
                  <span className={styles.toggle}>
                    <input
                      type="checkbox"
                      defaultChecked={linkData.show}
                      id={`togglelinktitle`}
                      name="checkbox"
                      onChange={(e) =>
                        setLinkData((prevData) => ({
                          ...prevData,
                          show: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor={`togglelinktitle`}></label>
                  </span>
                </div>
              </div>
              <div className={styles.linkUrl}>
                <div className={styles.inputurl}>
                  {/* <label>Link Title</label> */}
                  <input
                    placeholder="Link URL"
                    onChange={(e) =>
                      setLinkData({ ...linkData, linkUrl: e.target.value })
                    }
                  ></input>
                </div>
                <div className={styles.deletediv}>
                  <svg
                    width={!isMobile ? "14" : "9"}
                    height={!isMobile ? "15" : "10"}
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.01751 2.47624L6.20858 2.66728L6.59065 2.28521L6.39964 2.09416L4.77859 0.473145H4.39652L2.7755 2.09416L2.58446 2.28521L2.96654 2.66728L3.15757 2.47624L4.31739 1.31643V5.52725V5.79742H4.85773V5.52725V1.31643L6.01751 2.47624ZM0.805176 3.3659L1.07535 3.09573H2.4262V3.63607H1.34552V8.49913H7.8296V3.63607H6.74892V3.09573H8.09977L8.36994 3.3659V8.7693L8.09977 9.03947H1.07535L0.805176 8.7693V3.3659Z"
                      fill="#676B5F"
                    />
                  </svg>
                  <svg
                    width={!isMobile ? "14" : "8"}
                    height={!isMobile ? "15" : "9"}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.38866 0.569336L4.19762 0.648467L3.47717 1.36892L3.39803 1.55996V2.19062H0.966459H0.696289V2.73096H0.966459H1.77698L1.77701 8.9446L2.04718 9.21477H7.99094L8.26111 8.9446L8.26105 2.73096H9.07156H9.34173V2.19062H9.07156H6.64009V1.55996L6.56093 1.36892L5.84049 0.648467L5.64945 0.569336H4.38866ZM6.09975 2.19062V1.67187L5.53754 1.10968H4.50057L3.93837 1.67187V2.19062H6.09975ZM3.39803 2.73096H2.31732L2.31735 8.67443H7.72077L7.72071 2.73096H6.64009H6.09975H3.93837H3.39803ZM4.47867 4.35198V4.62215V6.78351V7.05368H3.93833V6.78351V4.62215V4.35198H4.47867ZM6.09969 4.62215V4.35198H5.55935V4.62215V6.78351V7.05368H6.09969V6.78351V4.62215Z"
                      fill="#676B5F"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {isLinkActive && (
              <div className={styles.apps}>
                <span>Applications</span>
                <div className={styles.appsList}>
                  {apps.map((app, index) => (
                    <div
                      key={index}
                      className={`${styles.appitems} ${
                        isAppSelected === app.title ? styles.selectedApp : ""
                      }`}
                      onClick={() => {
                        setIsAppSelected(app.title);
                        setLinkData((prevData) => ({
                          ...prevData,
                          appType: app.title,
                        }));
                      }}
                    >
                      <div className={styles.svgdiv}>
                        <img src={app.svg} alt={app.title} />
                      </div>
                      {/* <div className={styles.svgdiv}>{app.svg}</div> */}
                      <div className={styles.titlediv}>{app.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLinkModal;
