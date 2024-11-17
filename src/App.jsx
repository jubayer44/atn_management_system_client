/* eslint-disable react-hooks/exhaustive-deps */
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "./components/layouts/MainLayout";
import useLogout from "./hooks/useLogout";
import { useGetMyProfileQuery } from "./redux/features/user/userApi";
import { getNewAccessToken, getUserInfo } from "./services/authServices";
import { authKey } from "./utils/constant";
import { setToLocalStorage } from "./utils/local-storage";
import setAuthToken from "./utils/setAuthToekn";
const App = () => {
  const session = Cookies.get("accessSession");
  const {
    data: user,
    refetch,
    error,
  } = useGetMyProfileQuery({ sessionId: session });
  const role = getUserInfo()?.role;
  const pathName = useLocation()?.pathname;
  const logout = useLogout();

  const getToken = async () => {
    const response = await getNewAccessToken();
    const accessToken = response?.data?.data?.accessToken || null;
    if (accessToken) {
      setToLocalStorage(authKey, accessToken);
      setAuthToken(accessToken);
    }
  };

  useEffect(() => {
    if (role && user?.data?.email) {
      if (role !== user?.data?.role.toLowerCase()) {
        getToken();
      }
    }
    if (user && user?.data?.session === false) {
      logout();
    }
    refetch();
  }, [role, user, pathName, refetch, session]);

  useEffect(() => {
    if (error?.data?.message === "User not found") {
      logout();
    }
  }, [error]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      <Toaster position="top-center" />
      <MainLayout />
    </div>
  );
};

export default App;
