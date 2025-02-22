import React from "react";
import Navbar from "../components/Navbar";

const Appearance = () => {
  const active = {
    isLinks: false,
    isAppearance: true,
    isAnalytics: false,
    isSettings: false,
  };
  return (
    <>
      <Navbar active={active} />
      <div>Appearance</div>
    </>
  );
};

export default Appearance;
