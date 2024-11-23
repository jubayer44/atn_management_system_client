/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../services/authServices";
import { userRole } from "../../utils/constant";

const UserProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = getUserInfo();

  if (!user?.email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role.toLowerCase() !== userRole.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtectedRoute;
