import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Spark from "../assets/Spark.png";
import Boy from "../assets/Boy.png";
import styles from "./styles/Profile.module.css";
import { getProfile, setProfile } from "../services/profile.services";
import { toast } from "react-toastify";
import { userDetails } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import Preview from "../components/Preview";
import AddLinkModal from "../modals/AddLinkModal";
import EditLinkModal from "../modals/EditLinkModal";
import useIsMobile from "../components/hooks/useIsMobile";
import { getLinks, deleteLink, setShow } from "../services/link.services";
import { BsShare } from "react-icons/bs";
const url = import.meta.env.VITE_FRONTEND_URL;
const Profile = () => {
  const navigate = useNavigate();
  const active = {
    isLinks: true,
    isAppearance: false,
    isAnalytics: false,
    isSettings: false,
  };
  const isMobile = useIsMobile();
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [isLinkToggle, setIsLinkToggle] = useState(false);
  const [logoutVisbile, setLogoutVisible] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [name, setName] = useState("");
  const [saveBtnClicked, setSaveBtnClicked] = useState(false);
  const [isEditLinkModalOpen, setIsEditLinkModalOpen] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const [isShowClicked, setIsShowClicked] = useState(false);
  const [appLink, setAppLink] = useState([]);
  const [shopLink, setShopLink] = useState([]);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          profileId: "",
          username: "",
          bio: "Bio",
          profilePic: Boy,
          banner: {
            profileBg: "#342b26",
            fontColor: "#FFFFFF",
          },
        };
  });
  const ShopImg = () => (
    <svg
      width={!isMobile ? "14" : "9"}
      height={!isMobile ? "14" : "9"}
      viewBox="0 0 21 21"
      style={{ marginBottom: "-2px", marginRight: "5px", cursor: "pointer" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 3.5H15.5C16.0304 3.5 16.5391 3.71071 16.9142 4.08579C17.2893 4.46086 17.5 4.96957 17.5 5.5V15.5C17.5 16.0304 17.2893 16.5391 16.9142 16.9142C16.5391 17.2893 16.0304 17.5 15.5 17.5H5.5C4.96957 17.5 4.46086 17.2893 4.08579 16.9142C3.71071 16.5391 3.5 16.0304 3.5 15.5V5.5C3.5 4.96957 3.71071 4.46086 4.08579 4.08579C4.46086 3.71071 4.96957 3.5 5.5 3.5Z"
        stroke="#9EA099"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 13.5L14.5 10.5L11.5 13.485M15.5 17.5L6.5 8.5L3.5 11.5"
        stroke="#9EA099"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8Z"
        fill="#9EA099"
      />
    </svg>
  );
  const Move = () => (
    <svg
      width={!isMobile ? "10" : "6"}
      height={!isMobile ? "12" : "10"}
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
  const Del = () => (
    <svg
      width={!isMobile ? "14" : "8"}
      height={!isMobile ? "15" : "9"}
      style={{ cursor: "pointer" }}
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
      width={isMobile ? "18" : "11"}
      height={!isMobile ? "18" : "11"}
      style={{ marginRight: "5px" }}
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
      style={{ marginLeft: "5px", cursor: "pointer" }}
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
  const Icon = () => (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_198_1623)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.91381 4.01871C10.0265 4.00019 10.1416 4.03642 10.2237 4.11617C11.1777 5.04387 11.7032 6.2855 11.7032 7.6123C11.7032 10.3029 9.51435 12.4918 6.8239 12.4918C4.59836 12.4918 2.6569 10.9851 2.10262 8.82772C1.99759 8.41842 1.94434 8.00953 1.94434 7.6123C1.94434 6.83256 2.12649 6.08299 2.48574 5.38448C2.83929 4.69776 3.35916 4.09644 3.98922 3.64534L4.00036 3.63766C4.02357 3.62235 4.04837 3.60421 4.07462 3.585L4.07733 3.58301L4.11692 3.55416C5.11871 2.83729 5.7479 1.72599 5.8441 0.504482C5.85358 0.383929 5.92281 0.276153 6.02851 0.217368C6.13422 0.158607 6.26223 0.156658 6.36967 0.21217C7.60372 0.849995 8.50967 1.98673 8.85516 3.33089C8.96024 3.74012 9.01349 4.14901 9.01349 4.54636C9.01349 4.75344 8.99999 4.95997 8.97316 5.16527C9.24228 4.88107 9.47102 4.55957 9.6511 4.20972C9.70346 4.10803 9.80094 4.03717 9.91381 4.01871ZM6.54126 9.94066C7.49334 9.94066 8.26514 9.04022 8.26514 7.92947C8.26514 6.81872 7.49334 5.91827 6.54126 5.91827C5.58919 5.91827 4.81738 6.81872 4.81738 7.92947C4.81738 9.04022 5.58919 9.94066 6.54126 9.94066Z"
          fill={data.banner.profileBg === "#ffffff" ? "#000000b8" : "#ffffff"}
          fillOpacity="0.72"
        />
      </g>
      <defs>
        <clipPath id="clip0_198_1623">
          <rect
            width="13.6702"
            height="12.32"
            fill="white"
            transform="translate(0.220703 0.171875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const [links, setLinks] = useState([]);
  const getDetails = async () => {
    const res = await getProfile();
    const temp = await res.json();
    if (res.status === 200) {
      setData({
        ...data,
        profileId: temp.profile._id,
        username: temp.profile.username,
        bio: temp.profile.bio,
        profilePic: temp.profile.profilePic,
        banner: {
          profileBg: temp.profile.banner.profileBg,
          fontColor: temp.profile.banner.fontColor,
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
  const getallLinks = async () => {
    const res = await getLinks();
    const data = await res.json();
    if (res.status === 200) {
      setLinks(data.links);
      const apps = data.links.filter((link) => link.linkType === "app");
      const shops = data.links.filter((link) => link.linkType === "shop");
      setAppLink(apps);
      setShopLink(shops);
    }
  };
  const handleDelete = async (id) => {
    const res = await deleteLink(id);
    const temp = await res.json();
    if (res.status === 200) {
      getallLinks();
      toast.success("Link Deleted Successfully");
    }
  };
  useEffect(() => {
    getallLinks();
  }, []);
  useEffect(() => {}, [
    saveBtnClicked,
    isEditLinkModalOpen,
    isAddLinkModalOpen,
    isShowClicked,
  ]);
  useEffect(() => {
    getDetails();
    getUserData();
  }, [saveBtnClicked]);
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);

  const handleSetShow = async (linkId, show) => {
    const res = await setShow(linkId, { show });
    const temp = await res.json();
    if (res.status === 200) {
      getallLinks();
      toast.success("Profile Updated Successfully");
    } else {
      toast.error("failed to update profile");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (data.profilePic && typeof data.profilePic === "object") {
      formData.append("profilePic", data.profilePic);
    } else {
      formData.append("profilePic", data.profilePic);
    }
    formData.append("bio", data.bio);
    formData.append("bannerProfileBg", data.banner.profileBg);
    formData.append("bannerFontColor", data.banner.fontColor);
    try {
      const res = await setProfile(formData);
      const data = await res.json();
      if (res.status === 200) {
        getDetails();
        toast.success("succesfully saved");
      } else {
        toast.error("failed to save try again");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const PreviewComp = () => (
    <Preview />
  );
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
            src={
              typeof data.profilePic === "object"
                ? URL.createObjectURL(data.profilePic)
                : data.profilePic
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
        <div
          className={styles.deskHeader}
          style={{ display: isMobile ? "none" : "" }}
        >
          <div>
            Hi, <span>{name}</span>!
            <h5>Congratulations . You got a great response today . </h5>
          </div>
          <div
            className={styles.deskHeadershare}
            onClick={() => {
              navigator.clipboard.writeText(url + "/profile/" + data.username);
            }}
          >
            <BsShare size={12} /> Share
          </div>
        </div>
        <div className={isMobile ? "" : styles.deskcontent}>
          <div
            className={styles.liveview}
            style={{ display: !isMobile ? "" : "none" }}
          >
            {!isMobile && (
              <PreviewComp />
            )}
            <div className={styles.astrik}>
              *To watch for changes, Click on Save. If no changes seen, please
              refresh the page.
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.profile}>
              <span className={styles.protitle}>Profile</span>
              <div className={styles.bio}>
                <div className={styles.profilepic}>
                  <img
                    src={
                      typeof data.profilePic === "object"
                        ? URL.createObjectURL(data.profilePic)
                        : data.profilePic
                    }
                    id="profilepic"
                  />
                  <div className={styles.pick}>
                    <label htmlFor="pickimg">Pick an image</label>
                    <input
                      id="pickimg"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setData({
                          ...data,
                          profilePic: e.target.files[0],
                        })
                      }
                    />
                    <span
                      onClick={() =>
                        setData({
                          ...data,
                          profilePic:
                            "https://res.cloudinary.com/dzoc66yv6/image/upload/v1740589747/Boy_cplghc.png",
                        })
                      }
                    >
                      Remove
                    </span>
                  </div>
                </div>
                <span className={styles.title}>
                  <h4>Profile Title</h4>
                  <h5>@{data.username}</h5>
                </span>
                <span className={styles.biobio}>
                  <label htmlFor="bio">Bio</label>
                  <input
                    id="bio"
                    value={data.bio}
                    onChange={(e) => {
                      const words = e.target.value.trim();
                      if (words.length <= 80) {
                        setData({ ...data, bio: e.target.value });
                      } else {
                        e.target.blur();
                      }
                    }}
                  />
                </span>
                <span className={styles.wordcount}>{data.bio.length}/80</span>
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
                  <button
                    className={styles.addBtn}
                    onClick={() => setIsAddLinkModalOpen(true)}
                  >
                    <span>+</span>
                    Add
                  </button>
                </div>
                <div className={styles.linksContainer}>
                  {(isLinkActive ? appLink : shopLink).map((link, id) => (
                    <div className={styles.allLinks} key={id}>
                      <div className={styles.link}>
                        <div className={styles.move}>
                          <Move />
                        </div>
                        <div className={styles.linkdes}>
                          <span className={styles.linkTitle}>
                            {link.linkTitle}{" "}
                            <span
                              onClick={() => {
                                setIsEditLinkModalOpen(true);
                                setLinkId(link._id);
                              }}
                            >
                              <Edit />
                            </span>
                          </span>
                          <span className={styles.linkUrl}>
                            {link.linkUrl}{" "}
                            <span
                              onClick={() => {
                                setIsEditLinkModalOpen(true);
                                setLinkId(link._id);
                              }}
                            >
                              <Edit />
                            </span>
                          </span>
                          <span className={styles.clicks}>
                            {!isLinkActive && (
                              <div>
                                <ShopImg />
                              </div>
                            )}
                            <Clickimg /> {link.clicks} clicks
                          </span>
                        </div>
                        <div className={styles.delToggle}>
                          <span className={styles.toggle}>
                            <input
                              type="checkbox"
                              id={`toggle-${id}`}
                              name="checkbox"
                              defaultChecked={link.show}
                              onChange={(e) => {
                                setLinks((prevLinks) =>
                                  prevLinks.map((prevLink) =>
                                    prevLink._id === link._id
                                      ? { ...prevLink, show: e.target.checked }
                                      : prevLink
                                  )
                                );
                                setIsShowClicked(e.target.checked);
                                handleSetShow(link._id, e.target.checked);
                              }}
                            />
                            <label htmlFor={`toggle-${id}`}></label>
                          </span>
                          <span
                            className={styles.delBtn}
                            onClick={() => {
                              handleDelete(link._id);
                            }}
                          >
                            <Del style={{ cursor: "pointer" }} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.banner}>
              <span className={styles.bannerTitle}>Banner</span>
              <div className={styles.customize}>
                <div
                  className={styles.bannerdisplay}
                  style={{ backgroundColor: data.banner.profileBg }}
                >
                  <img
                    src={
                      typeof data.profilePic === "object"
                        ? URL.createObjectURL(data.profilePic)
                        : data.profilePic
                    }
                  />
                  <h5
                    style={{
                      color:
                        data.banner.profileBg === "#ffffff"
                          ? "#000000b8"
                          : "#ffffffb8",
                    }}
                  >
                    @{data.username}
                  </h5>
                  <h6
                    style={{
                      color:
                        data.banner.profileBg === "#ffffff"
                          ? "#000000b8"
                          : "#ffffffb8",
                    }}
                  >
                    <Icon />/{data.username}
                  </h6>
                </div>
                <div className={styles.custombg}>
                  <span className={styles.bgtitle}>
                    Custom Background Color
                  </span>
                  <div className={styles.bgBtns}>
                    <button
                      style={{ backgroundColor: "#342B26" }}
                      onClick={() => {
                        setData((prevData) => ({
                          ...prevData,
                          banner: {
                            ...prevData.banner,
                            profileBg: "#342B26",
                            fontColor: "#ffffff",
                          },
                        }));
                      }}
                    ></button>
                    <button
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "0.46px solid #0000002E",
                      }}
                      onClick={() => {
                        setData((prevData) => ({
                          ...prevData,
                          banner: {
                            ...prevData.banner,
                            profileBg: "#ffffff",
                            fontColor: "#000000",
                          },
                        }));
                      }}
                    ></button>
                    <button
                      style={{ backgroundColor: "#000000" }}
                      onClick={() => {
                        setData((prevData) => ({
                          ...prevData,
                          banner: {
                            ...prevData.banner,
                            profileBg: "#000000",
                            fontColor: "#ffffff",
                          },
                        }));
                      }}
                    ></button>
                  </div>
                  <div className={styles.selectColor}>
                    <div
                      style={{
                        backgroundColor:
                          data.banner.profileBg &&
                          data.banner.profileBg !== "#000000"
                            ? data.banner.profileBg
                            : "#000000",
                      }}
                    ></div>
                    <input
                      type="text"
                      value={
                        data.banner.profileBg &&
                        data.banner.profileBg !== "#000000"
                          ? data.banner.profileBg
                          : "#000000"
                      }
                      onChange={(e) => {
                        setData((prevData) => ({
                          ...prevData,
                          banner: {
                            ...prevData.banner,
                            profileBg: e.target.value,
                            fontColor: "#ffffff",
                          },
                        }));
                      }}
                    />
                  </div>
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
      {isAddLinkModalOpen && (
        <AddLinkModal
          onClose={() => setIsAddLinkModalOpen(false)}
          profileId={data.profileId}
        />
      )}
      {isEditLinkModalOpen && (
        <EditLinkModal
          onClose={() => setIsEditLinkModalOpen(false)}
          linkId={linkId}
        />
      )}
    </>
  );
};

export default Profile;
