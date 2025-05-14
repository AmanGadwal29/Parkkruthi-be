import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-fit">
      <div className="layout_middle">
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
