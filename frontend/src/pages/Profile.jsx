import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Spark from "../assets/Spark.png";
import Boy from "../assets/Boy.png";
import styles from "./styles/Profile.module.css";
const Profile = () => {
  const active = {
    isLinks: true,
    isAppearance: false,
    isAnalytics: false,
    isSettings: false,
  };
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [isShopActive, setIsShopActive] = useState(false);
  const [profileimg, setProfileimg] = useState(Boy);
  const [isLinkToggle, setIsLinkToggle] = useState(false);
  const [bio, setBio] = useState("Bio");
  const username = "@bardrock";
  const linkTitle = "Instagram";
  const Move = () => (
    <svg
      width="6"
      height="10"
      viewBox="0 0 4 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.361816 0.437988H1.30282V1.36692H0.361816V0.437988ZM2.71432 0.437988H3.65532V1.36692H2.71432V0.437988ZM0.361816 2.14104H1.30282V3.06998H0.361816V2.14104ZM2.71432 2.14104H3.65532V3.06998H2.71432V2.14104ZM0.361816 3.84409H1.30282V4.77303H0.361816V3.84409ZM2.71432 3.84409H3.65532V4.77303H2.71432V3.84409ZM0.361816 5.54714H1.30282V6.47608H0.361816V5.54714ZM2.71432 5.54714H3.65532V6.47608H2.71432V5.54714Z"
        fill="#9EA099"
      />
    </svg>
  );
  const linkUrl = "https://www.instagram.com/opopo_08/";
  const Del = () => (
    <svg
      width="8"
      height="9"
      viewBox="0 0 6 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.38553 6.67525C1.22159 6.67525 1.08204 6.61767 0.966893 6.50252C0.851743 6.38737 0.794167 6.24794 0.794167 6.08424V1.55202H0.428223V1.18607H1.892V0.904297H4.08767V1.18607H5.55145V1.55202H5.1855V6.08424C5.1855 6.25258 5.12915 6.39322 5.01644 6.50618C4.90373 6.61913 4.76296 6.67549 4.59414 6.67525H1.38553ZM4.81956 1.55202H1.16011V6.08424C1.16011 6.14987 1.18121 6.20379 1.22342 6.24599C1.26563 6.2882 1.31966 6.3093 1.38553 6.3093H4.5945C4.65061 6.3093 4.70221 6.28588 4.7493 6.23904C4.79638 6.1922 4.8198 6.14048 4.81956 6.08388V1.55202ZM2.18768 5.57741H2.55363V2.28391H2.18768V5.57741ZM3.42604 5.57741H3.79199V2.28391H3.42604V5.57741Z"
        fill="#9EA099"
      />
    </svg>
  );
  const Clickimg = () => (
    <svg
      width="11"
      height="11"
      style={{marginRight:"5px"}}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_233_571)">
        <path
          d="M4.43463 6.33385H1.26855V10.8036H4.43463M4.43463 10.8036V4.09898H7.78694M4.43463 10.8036H7.78694M7.78694 10.8036V1.11914H10.953V10.8036H7.78694Z"
          stroke="#9EA099"
          strokeWidth="0.548917"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_233_571">
          <rect
            width="10.4294"
            height="10.4294"
            fill="white"
            transform="translate(0.896973 0.74707)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const Edit = () => (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      style={{marginLeft:"5px"}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.95708 8.73427H8.34841M7.25058 2.69618L7.7995 3.2451M8.07395 1.32389C8.18217 1.43197 8.26802 1.56032 8.32659 1.7016C8.38516 1.84288 8.41531 1.99432 8.41531 2.14727C8.41531 2.30021 8.38516 2.45165 8.32659 2.59293C8.26802 2.73421 8.18217 2.86256 8.07395 2.97064L2.85924 8.18535L0.663574 8.73427L1.21249 6.56934L6.4294 1.32609C6.63502 1.11946 6.91083 0.997703 7.20206 0.984992C7.49329 0.972281 7.77865 1.06954 8.0015 1.25747L8.07395 1.32389Z"
        stroke="#9EA099"
        strokeWidth="0.548917"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
  return (
    <>
      <Navbar active={active} />
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Spark} className={styles.logo} alt="logo" />
          <img src={profileimg} alt="profile" className={styles.pic} />
        </div>
        <div className={styles.content}>
          <div className={styles.profile}>
            <span className={styles.protitle}>Profile</span>
            <div className={styles.bio}>
              <div className={styles.profilepic}>
                <img src={profileimg} id="profilepic" />
                <div className={styles.pick}>
                  <label htmlFor="pickimg">Pick an image</label>
                  <input
                    id="pickimg"
                    type="file"
                    accept="image/*"
                    onChange={() =>
                      setProfileimg(
                        URL.createObjectURL(
                          document.getElementById("pickimg").files[0]
                        )
                      )
                    }
                  />
                  <span onClick={() => setProfileimg(Boy)}>Remove</span>
                </div>
              </div>
              <span className={styles.title}>
                <h4>Profile Title</h4>
                <h5>{username}</h5>
              </span>
              <span className={styles.biobio}>
                <label htmlFor="bio">Bio</label>
                <input
                  id="bio"
                  placeholder={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </span>
              <span className={styles.wordcount}>{bio.length}/80</span>
            </div>
          </div>
          <div className={styles.links}>
            <div className={styles.toggleContainer}>
              <span
                onClick={() => setIsLinkActive(true)}
                className={isLinkActive ? styles.active : styles.inactive}
              >
                <ToggleIcon isActive={isLinkActive} />
                Add Link
              </span>
              <span
                onClick={() => setIsLinkActive(false)}
                className={!isLinkActive ? styles.active : styles.inactive}
              >
                <ToggleIcon isActive={!isLinkActive} />
                Add Shop
              </span>
            </div>
            <div className={styles.addLinks}>
              <div className={styles.addBtndiv}>
                <button className={styles.addBtn}>
                  <span>+</span>
                  Add
                </button>
              </div>
              <div className={styles.allLinks}>
                <div className={styles.link}>
                  <span className={styles.move}>
                    <Move />
                  </span>
                  <div className={styles.linkdes}>
                    <span className={styles.linkTitle}>
                      {linkTitle} <Edit />
                    </span>
                    <span className={styles.linkUrl}>
                      {linkUrl}
                      <Edit />
                    </span>
                    <span className={styles.clicks}>
                      <Clickimg /> 0 clicks
                    </span>
                  </div>
                  <div className={styles.delToggle}>
                    <span className={styles.toggle}>
                      <input
                        type="checkbox"
                        id="toggle"
                        checked={isLinkToggle}
                        name="checkbox"
                        onChange={() => setIsLinkToggle((prev) => !prev)}
                      />
                      <label htmlFor="toggle"></label>
                    </span>
                    <Del />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
