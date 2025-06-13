// Utils/RedirectIfLoggedIn.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const location = useLocation(); // to get current path

  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  if (isAuthenticated && location.pathname === "/adminlogin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default RedirectIfLoggedIn;
