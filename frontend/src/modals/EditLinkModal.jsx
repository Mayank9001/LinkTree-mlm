import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/AddLinkModal.module.css";
import { toast } from "react-toastify";
import { getSingleLink, editLink, deleteLink } from "../services/link.services";
const EditLinkModal = ({ onClose, linkId }) => {
  const modalRef = useRef(null);
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [isAppSelected, setIsAppSelected] = useState("");
  const apps = [
    {
      title: "Instagram",
      svg: (
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
    },
    {
      title: "FaceBook",
      svg: (
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
    },
    {
      title: "YouTube",
      svg: (
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
    },
    {
      title: "X",
      svg: (
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
    profileId: "",
  });
  const edit = async () => {
    const res = await editLink(linkId, linkData);
    const data = await res.json();
    if (data.status === 200) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const fetchLink = async () => {
      if (!linkId) return;
      try {
        const res = await getSingleLink(linkId);
        const data = await res.json();
        if (res.status === 200) {
          setLinkData({
            linkTitle: data.link.linkTitle,
            linkUrl: data.link.linkUrl,
            linkType: data.link.linkType,
            appType: data.link.appType,
            show: data.link.show,
            profileId: data.link.profileId,
          });
        }
      } catch (error) {
        console.error("Failed to fetch link:", error);
      }
    };
    fetchLink();
  }, [linkId]);
  useEffect(() => {
    setIsAppSelected(linkData.appType);
  }, [linkData]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        edit();
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, linkData]);
  const handleDelete = async () => {
    const res = await deleteLink(linkId);
    const data = await res.json();
    if (res.status === 200) {
      toast.success("link deleted successfully");
      onClose();
    }
  };
  return (
    <>
      <div
        className={styles.main}
        style={{ width: "100vw", zIndex: "1000", marginLeft: "0" }}
      >
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
                    value={linkData.linkTitle}
                    onChange={(e) =>
                      setLinkData({ ...linkData, linkTitle: e.target.value })
                    }
                  ></input>
                </div>
                <div className={styles.togglediv}>
                  <span className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={linkData.show}
                      id={`togglelinktitle`}
                      name="checkbox"
                      onChange={() =>
                        setLinkData((prevData) => ({
                          ...prevData,
                          show: !prevData.show,
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
                    value={linkData.linkUrl}
                    onChange={(e) =>
                      setLinkData({ ...linkData, linkUrl: e.target.value })
                    }
                  ></input>
                </div>
                <div className={styles.deletediv}>
                  <svg
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    onClick={() => {
                      navigator.clipboard.writeText(linkData.linkUrl);
                      toast.success("Copied to clipboard");
                    }}
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
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    onClick={handleDelete}
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
                      <div className={styles.svgdiv}>{app.svg}</div>
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

export default EditLinkModal;
