import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  useDeleteOtherSessionMutation,
  useGetMySessionsQuery,
} from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useLogout from "./../../hooks/useLogout";

const ManageDevices = () => {
  const [loadingSessionId, setLoadingSessionId] = useState(null);
  const {
    data: mySession,
    isLoading,
    refetch,
    isFetching,
  } = useGetMySessionsQuery();

  const [deleteOtherSession, { isLoading: isLoadingDelete }] =
    useDeleteOtherSessionMutation();

  const logout = useLogout();
  const sessionId = Cookies.get("accessSession");
  const pathName = useLocation()?.pathname;

  const handleDeleteSession = async (id) => {
    setLoadingSessionId(id);
    await deleteOtherSession(id);
    refetch();
    setLoadingSessionId(null);
  };

  useEffect(() => {
    if (pathName === "/manage-devices") {
      refetch();
    }
    if (mySession?.data?.length === 0) {
      logout();
    }
  }, [pathName, refetch, logout, mySession]);

  return (
    <div className="w-full max-w-lg shadow-md rounded-md mx-auto mb-40 md:p-8 p-4">
      <h1 className="text-lg font-semibold text-tColor text-center">
        Manage Devices
      </h1>
      <div className="-mt-6">
        <Link to="/profile">
          <FaArrowLeft className="text-blue-500 text-xl" />
        </Link>
      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center my-3">
          Loading
          <span className="animate-spin rounded-full h-4 w-4 border-b-4 ml-1 border-tColor"></span>
        </div>
      )}

      <div className="mt-4">
        {mySession &&
          mySession?.data?.map((item) => (
            <div
              className="bg-white shadow-md rounded-md p-4 mb-4"
              key={item?.id}
            >
              {item?.id === sessionId && (
                <p className=" text-sm text-right text-green-500">
                  This Device
                </p>
              )}
              <p className=" text-sm text-tColor">Device: {item?.device}</p>
              <p className=" text-sm text-tColor">Browser: {item?.browser}</p>
              <p className=" text-sm text-tColor">
                Location: {item?.city}, {item?.country}
              </p>
              <button
                disabled={isLoadingDelete}
                onClick={() => handleDeleteSession(item?.id)}
                className={`py-1 px-4 mt-2 rounded text-white text-xs gap-2 font-[500] cursor-pointer bg-red-500 ${
                  loadingSessionId === item?.id
                    ? "opacity-60"
                    : "hover:bg-red-700"
                }`}
              >
                {loadingSessionId === item?.id ? "Signing Out" : "Sign Out"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageDevices;
