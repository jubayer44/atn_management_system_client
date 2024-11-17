import { useCallback } from "react";
import Cookies from "js-cookie";
import { removeCookies, removeSession } from "../services/authServices";

const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      await removeSession();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    try {
      const res = await removeCookies();
      if (res?.data?.success) {
        localStorage.removeItem("accessToken");
        Cookies.remove("accessToken");
        Cookies.remove("accessSession");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  return logout;
};

export default useLogout;
