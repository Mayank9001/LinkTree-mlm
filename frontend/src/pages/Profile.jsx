import React from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  const active={
    isLinks: true,
    isAppearance: false,
    isAnalytics: false,
    isSettings: false,
  }
  return (
    <>
    <Navbar active={active}/>
    </>
  );
};

export default Profile;
