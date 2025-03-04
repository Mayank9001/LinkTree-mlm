import React, { useState, useEffect } from "react";
import styles from "./styles/Visitprofile.module.css";
import Boy from "../assets/Boy.png";
import { useParams } from "react-router-dom";
import { visitProfile, getGlobalProfile } from "../services/profile.services";
import useIsMobile from "../components/hooks/useIsMobile";
import { visitLogs } from "../services/logs.services";
import { toast } from "react-toastify";
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
    Instagram: (
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0067 0.116699H3.83728C2.09043 0.116699 0.674316 1.53281 0.674316 3.27967V10.4491C0.674316 12.1959 2.09043 13.612 3.83728 13.612H11.0067C12.7535 13.612 14.1696 12.1959 14.1696 10.4491V3.27967C14.1696 1.53281 12.7535 0.116699 11.0067 0.116699Z"
          fill="url(#paint0_radial_222_967)"
        />
        <path
          d="M11.0067 0.116699H3.83728C2.09043 0.116699 0.674316 1.53281 0.674316 3.27967V10.4491C0.674316 12.1959 2.09043 13.612 3.83728 13.612H11.0067C12.7535 13.612 14.1696 12.1959 14.1696 10.4491V3.27967C14.1696 1.53281 12.7535 0.116699 11.0067 0.116699Z"
          fill="url(#paint1_radial_222_967)"
        />
        <path
          d="M7.42248 1.59277C5.99081 1.59277 5.8111 1.59905 5.24883 1.62461C4.68762 1.65034 4.30453 1.73917 3.96936 1.86953C3.62259 2.00417 3.32849 2.1843 3.03549 2.4774C2.74223 2.77045 2.5621 3.06455 2.42704 3.41116C2.29631 3.74644 2.20738 4.12968 2.18213 4.69064C2.15698 5.25296 2.15039 5.43272 2.15039 6.86444C2.15039 8.29616 2.15672 8.47528 2.18223 9.03755C2.20806 9.59877 2.29689 9.98186 2.42715 10.317C2.56189 10.6638 2.74202 10.9579 3.03513 11.2509C3.32807 11.5442 3.62217 11.7247 3.96868 11.8593C4.30411 11.9897 4.68725 12.0785 5.24836 12.1043C5.81068 12.1298 5.99023 12.1361 7.42184 12.1361C8.85367 12.1361 9.0328 12.1298 9.59507 12.1043C10.1563 12.0785 10.5398 11.9897 10.8752 11.8593C11.2218 11.7247 11.5155 11.5442 11.8084 11.2509C12.1017 10.9579 12.2817 10.6638 12.4169 10.3172C12.5464 9.98186 12.6354 9.59867 12.6618 9.03766C12.687 8.47539 12.6936 8.29616 12.6936 6.86444C12.6936 5.43272 12.687 5.25306 12.6618 4.69074C12.6354 4.12953 12.5464 3.74649 12.4169 3.41132C12.2817 3.06455 12.1017 2.77045 11.8084 2.4774C11.5152 2.1842 11.2219 2.00406 10.8749 1.86959C10.5388 1.73917 10.1555 1.65029 9.59433 1.62461C9.03201 1.59905 8.85298 1.59277 7.42084 1.59277H7.42248ZM6.94956 2.54277C7.08994 2.54256 7.24656 2.54277 7.42248 2.54277C8.83005 2.54277 8.99684 2.54783 9.55268 2.57308C10.0667 2.59659 10.3456 2.68247 10.5315 2.75464C10.7775 2.85016 10.9529 2.96439 11.1373 3.14895C11.3218 3.33346 11.436 3.50916 11.5318 3.75519C11.6039 3.94075 11.6899 4.21972 11.7133 4.73371C11.7386 5.28944 11.744 5.45634 11.744 6.86323C11.744 8.27011 11.7386 8.43707 11.7133 8.99275C11.6898 9.50673 11.6039 9.7857 11.5318 9.97132C11.4362 10.2173 11.3218 10.3925 11.1373 10.5769C10.9528 10.7614 10.7776 10.8756 10.5315 10.9712C10.3458 11.0437 10.0667 11.1293 9.55268 11.1528C8.99695 11.1781 8.83005 11.1836 7.42248 11.1836C6.01485 11.1836 5.848 11.1781 5.29232 11.1528C4.77834 11.1291 4.49937 11.0432 4.31339 10.9711C4.06741 10.8755 3.89166 10.7613 3.70715 10.5768C3.52264 10.3923 3.40846 10.217 3.31268 9.97089C3.24051 9.78528 3.15453 9.50631 3.13112 8.99232C3.10587 8.43659 3.10081 8.26969 3.10081 6.86191C3.10081 5.45412 3.10587 5.28812 3.13112 4.73239C3.15463 4.21841 3.24051 3.93943 3.31268 3.75361C3.40825 3.50758 3.52264 3.33188 3.7072 3.14737C3.89176 2.96287 4.06741 2.84863 4.31344 2.7529C4.49926 2.68041 4.77834 2.59475 5.29232 2.57113C5.77863 2.54915 5.96709 2.54256 6.94956 2.54145V2.54277ZM10.2365 3.41807C9.88722 3.41807 9.60387 3.70115 9.60387 4.05045C9.60387 4.3997 9.88722 4.68305 10.2365 4.68305C10.5857 4.68305 10.8691 4.3997 10.8691 4.05045C10.8691 3.70121 10.5857 3.41786 10.2365 3.41786V3.41807ZM7.42248 4.1572C5.92745 4.1572 4.71529 5.36936 4.71529 6.86444C4.71529 8.35952 5.92745 9.57109 7.42248 9.57109C8.91756 9.57109 10.1293 8.35952 10.1293 6.86444C10.1293 5.36941 8.91745 4.1572 7.42237 4.1572H7.42248ZM7.42248 5.1072C8.39293 5.1072 9.17972 5.89388 9.17972 6.86444C9.17972 7.83489 8.39293 8.62168 7.42248 8.62168C6.45203 8.62168 5.66529 7.83489 5.66529 6.86444C5.66529 5.89388 6.45197 5.1072 7.42248 5.1072Z"
          fill="white"
        />
        <defs>
          <radialGradient
            id="paint0_radial_222_967"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.25901 14.6514) rotate(-90) scale(13.3749 12.4397)"
          >
            <stop stopColor="#FFDD55" />
            <stop offset="0.1" stopColor="#FFDD55" />
            <stop offset="0.5" stopColor="#FF543E" />
            <stop offset="1" stopColor="#C837AB" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_222_967"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(-1.5862 1.08884) rotate(78.681) scale(5.97864 24.6442)"
          >
            <stop stopColor="#3771C8" />
            <stop offset="0.128" stopColor="#3771C8" />
            <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    ),
    FaceBook: (
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_222_971)">
          <path
            d="M12.7081 0.116699H2.10462C1.72114 0.116699 1.35336 0.269038 1.08219 0.540202C0.81103 0.811366 0.658691 1.17914 0.658691 1.56263L0.658691 12.1661C0.658691 12.5496 0.81103 12.9174 1.08219 13.1885C1.35336 13.4597 1.72114 13.612 2.10462 13.612H6.23907V9.02392H4.34129V6.86436H6.23907V5.21841C6.23907 3.34624 7.35364 2.3121 9.06074 2.3121C9.87829 2.3121 10.7332 2.4579 10.7332 2.4579V4.29543H9.79123C8.86313 4.29543 8.57364 4.87139 8.57364 5.46211V6.86436H10.6455L10.3142 9.02392H8.57364V13.612H12.7081C13.0916 13.612 13.4594 13.4597 13.7305 13.1885C14.0017 12.9174 14.154 12.5496 14.154 12.1661V1.56263C14.154 1.17914 14.0017 0.811366 13.7305 0.540202C13.4594 0.269038 13.0916 0.116699 12.7081 0.116699Z"
            fill="#005CB1"
          />
        </g>
        <defs>
          <clipPath id="clip0_222_971">
            <rect
              width="13.4953"
              height="13.4953"
              fill="white"
              transform="translate(0.658691 0.116699)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    YouTube: (
      <svg
        width="15"
        height="10"
        viewBox="0 0 15 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_222_973)">
          <path
            d="M13.8403 1.85718C13.7629 1.569 13.6119 1.30627 13.4024 1.09517C13.1929 0.88406 12.9321 0.731936 12.646 0.653943C11.5988 0.366211 7.38389 0.366211 7.38389 0.366211C7.38389 0.366211 3.16881 0.37492 2.12155 0.662652C1.83549 0.74065 1.5747 0.892782 1.36515 1.1039C1.15561 1.31502 1.00462 1.57775 0.927216 1.86594C0.610445 3.7405 0.487564 6.59689 0.935915 8.39646C1.01332 8.68464 1.16432 8.94737 1.37386 9.15847C1.58341 9.36958 1.84419 9.52171 2.13025 9.5997C3.17751 9.88743 7.39248 9.88743 7.39248 9.88743C7.39248 9.88743 11.6074 9.88743 12.6546 9.5997C12.9407 9.52171 13.2015 9.36959 13.411 9.15849C13.6206 8.94738 13.7716 8.68465 13.849 8.39646C14.1831 6.51925 14.2861 3.66461 13.8403 1.85718Z"
            fill="#FF0000"
          />
          <path
            d="M6.04248 7.16693L9.53904 5.12668L6.04248 3.08643V7.16693Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_222_973">
            <rect
              width="13.4953"
              height="9.55919"
              fill="white"
              transform="translate(0.643066 0.366211)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    X: (
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_222_976)">
          <mask
            id="mask0_222_976"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="15"
            height="14"
          >
            <path
              d="M0.62793 0.116699H14.1233V13.612H0.62793V0.116699Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_222_976)">
            <path
              d="M11.2555 0.749023H13.3251L8.80417 5.9293L14.1233 12.9796H9.95898L6.69504 8.70452L2.96455 12.9796H0.893016L5.7282 7.43692L0.62793 0.749987H4.89824L7.84407 4.65688L11.2555 0.749023ZM10.5277 11.7381H11.6748L4.27167 1.92601H3.04167L10.5277 11.7381Z"
              fill="black"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_222_976">
            <rect
              width="13.4953"
              height="13.4953"
              fill="white"
              transform="translate(0.62793 0.116699)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
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
      window.open(link.linkUrl, "_blank");
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
                          : styles.link
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
                      {appIcons[link.appType]}
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
