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
  const [profileimg, setProfileimg] = useState(Boy);
  const [bio, setBio] = useState("Bio");
  const username = "@bardrock";
  // console.log(bio);
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
            <span>Profile</span>
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
                <input id="bio" placeholder={bio} onChange={(e)=>setBio(e.target.value)}/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
