import { authKey } from "../utils/constant";
import { decodedToken } from "../utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "../utils/local-storage";
import { instance as axiosInstance } from "../helpers/axios/axiosInstance";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const isUserLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
  return false;
};

export const storeUser = ({ accessToken }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const token = getFromLocalStorage(authKey);
  if (token) {
    const decodedData = decodedToken(token);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  } else {
    return null;
  }
};

export const getNewAccessToken = async () => {
  try {
    return await axiosInstance({
      url: `${API_URL}/auth/refresh-token`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    if (error?.message === "No token provided!") {
      try {
        const res = await removeCookies();
        if (res?.data?.success) {
          localStorage.removeItem("accessToken");
          Cookies.remove("accessToken");
          window.location.reload();
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  }
};

export const removeCookies = async () => {
  return await axiosInstance({
    url: `${API_URL}/auth/logout`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const removeSession = async () => {
  return await axiosInstance({
    url: `${API_URL}/auth/delete-session`,
    method: "delete",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
