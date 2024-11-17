/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../services/authServices";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = getUserInfo();

  if (!user?.email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    user?.role.toLowerCase() !== "admin" &&
    user?.role.toLowerCase() !== "super_admin"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
