import React from "react";
import "./Layout.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout_middle">
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
