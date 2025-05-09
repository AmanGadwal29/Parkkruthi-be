import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserProtectedRoute;
