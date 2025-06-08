import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserProtectedRoute;
