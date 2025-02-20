import React from "react";
import Navbar from "../components/Navbar";

const Settings = () => {
  const active = {
    isLinks: false,
    isAppearance: false,
    isAnalytics: false,
    isSettings: true,
  };
  return (
    <>
      <Navbar active={active} />
    </>
  );
};

export default Settings;
