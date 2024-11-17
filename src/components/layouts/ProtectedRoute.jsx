/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../services/authServices";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = getUserInfo();

  if (!user?.email) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
