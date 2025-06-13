// src/layouts/LandingLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LandingLayout;
