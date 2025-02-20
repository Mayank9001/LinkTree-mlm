import React from "react";
import Navbar from "../components/Navbar";

const Analytics = () => {
  const active = {
    isLinks: false,
    isAppearance: false,
    isAnalytics: true,
    isSettings: false,
  };
  return (
    <>
      <Navbar active={active} />
    </>
  );
};

export default Analytics;
