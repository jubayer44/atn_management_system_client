/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./../../services/authServices";
import Modal from "react-modal";

const ProtectedLogin = ({ children }) => {
  Modal.setAppElement("#root");
  const isLoggedIn = isUserLoggedIn();
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedLogin;
