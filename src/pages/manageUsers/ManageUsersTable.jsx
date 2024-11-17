/* eslint-disable react/prop-types */
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { getUserInfo } from "../../services/authServices";
import { userRole } from "../../utils/constant";

const ManageUsersTable = ({
  handleSelectAll,
  handleSelectUser,
  userData,
  selectedUsers,
  isLoadingUpdate,
  isLoadingDelete,
  toggleDialog,
  isDialogOpen,
  item,
  handleStatusChange,
  setUpdateModalOpen,
  setUpdateItem,
  setDeleteItem,
  setIsDeleteModalOpen,
}) => {
  const userInfo = getUserInfo();

  const isSuperAdmin = userInfo?.role === userRole.superAdmin;
  return (
    <table className="min-w-full">
      <thead className="whitespace-nowrap text-tColor">
        <tr>
          {isSuperAdmin && (
            <th className="p-4 text-left text-sm font-semibold">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedUsers.size ===
                    userData?.data?.filter(
                      (user) => user?.role?.toLowerCase() !== "super_admin"
                    )?.length
                  }
                  className="hidden"
                />
                <span className="w-5 h-5 bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out">
                  <span
                    className={`w-3 h-3 bg-blue-500 rounded-lg transform transition-transform duration-200 ease-in-out ${
                      selectedUsers.size ===
                      userData?.data?.filter(
                        (user) => user?.role?.toLowerCase() !== "super_admin"
                      )?.length
                        ? "scale-100"
                        : "scale-0"
                    }`}
                  />
                </span>
              </label>
            </th>
          )}

          <th className="p-4 text-left text-sm font-semibold">Name</th>
          <th className="p-4 text-left text-sm font-semibold">Role</th>
          <th className="p-4 text-left text-sm font-semibold">Status</th>
          <th className="p-4 text-left text-sm font-semibold">Action</th>
        </tr>
      </thead>

      <tbody className="whitespace-nowrap">
        {userData?.data?.map((user) => (
          <tr className="odd:bg-blue-50 hover:bg-blue-100" key={user.id}>
            {isSuperAdmin && (
              <td className="p-4 text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.has(user.id) &&
                      user?.role?.toLowerCase() !== "super_admin"
                    }
                    disabled={user?.role?.toLowerCase() === "super_admin"}
                    onChange={() => {
                      if (user?.role.toLowerCase() !== "super_admin") {
                        handleSelectUser(user.id);
                      }
                    }}
                    className="hidden" // Hide the default checkbox
                  />
                  <span
                    className={`w-5 h-5 bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200 ease-in-out ${
                      user?.role?.toLowerCase() === "super_admin"
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <span
                      className={`w-3 h-3 bg-blue-500 rounded-lg transform transition-transform duration-200 ease-in-out ${
                        selectedUsers.has(user.id) &&
                        user?.role?.toLowerCase() !== "super_admin"
                          ? "scale-100"
                          : "scale-0"
                      }`}
                    />
                  </span>
                </label>
              </td>
            )}

            <td className="p-4 text-sm">
              <div className="flex items-center cursor-pointer w-max">
                <div className="bg-primary rounded-full flex items-center justify-center w-8 h-8">
                  <span className="text-white font-semibold">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-black">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                </div>
              </div>
            </td>
            <td className="p-4 text-sm text-black">
              {capitalizeFirstLetter(user.role)}
            </td>
            <td className="p-4">
              <div className="flex">
                <p
                  className={`text-sm ${
                    user.status === "ACTIVE" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {capitalizeFirstLetter(user.status)}
                </p>
                <div className="relative flex justify-center items-center gap-2">
                  <button
                    className={`ml-2 ${
                      user?.role?.toLowerCase() === "super_admin" ||
                      user?.id === userInfo?.id
                        ? "hidden"
                        : "block"
                    }`}
                    disabled={
                      isLoadingUpdate ||
                      user?.role?.toLowerCase() === "super_admin"
                    }
                    title="Change Status"
                    onClick={() => toggleDialog(user.id)}
                  >
                    <FaEllipsisV className="text-xs text-gray-500 hover:text-gray-700" />
                  </button>
                  {isDialogOpen && item === user?.id && (
                    <div
                      id="status-dialog"
                      className="absolute bg-gray-50 p-2 mt-1 rounded z-10 top-5 -left-20 shadow-2xl border border-blue-500"
                    >
                      <p
                        onClick={() => handleStatusChange("Active")}
                        className="block w-full text-sm text-left px-4 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        Active
                      </p>
                      <p
                        onClick={() => handleStatusChange("Blocked")}
                        className="block w-full text-sm text-left px-4 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        Blocked
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="p-4">
              <button
                className={`mr-3 ${
                  user?.role?.toLowerCase() === "super_admin" ||
                  user?.id === userInfo?.id
                    ? "hidden"
                    : ""
                }`}
                title="Edit"
                disabled={
                  isLoadingUpdate || user?.role?.toLowerCase() === "super_admin"
                }
                onClick={() => {
                  setUpdateModalOpen(true);
                  setUpdateItem(user);
                }}
              >
                <FaEdit className="w-5 text-blue-500 hover:text-blue-700" />
              </button>
              <button
                className={`${
                  user?.role?.toLowerCase() === "super_admin" ||
                  user?.id === userInfo?.id
                    ? "hidden"
                    : ""
                }`}
                title="Delete"
                disabled={
                  isLoadingDelete || user?.role?.toLowerCase() === "super_admin"
                }
                onClick={() => {
                  setDeleteItem(user);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaTrash className="w-5 hover:text-red-700 text-red-500" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageUsersTable;
