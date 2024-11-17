import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { toast } from "sonner";
import ErrorModal from "../../components/modal/ErrorModal";
import useLogout from "../../hooks/useLogout";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import {
  useGetMyProfileQuery,
  useUpdateUserNameMutation,
} from "../../redux/features/user/userApi";
import { Link } from "react-router-dom";

const Profile = () => {
  const [editName, setEditName] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const logout = useLogout();
  const { data: userData, isLoading: isLoadingUser } = useGetMyProfileQuery();
  const [changePassword, { isLoading: isLoadingChangePassword }] =
    useChangePasswordMutation();
  const [updateUserName, { isLoading: isLoadingUpdateUserName }] =
    useUpdateUserNameMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const token = localStorage.getItem("accessToken");

  const nameUpdateId = "update-name";
  const passwordUpdateId = "update-password";

  // Change Password
  const onSubmit = async (data) => {
    toast.loading("Updating Password...", { id: passwordUpdateId });

    const result = await changePassword({
      data: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      token,
    });

    if (result?.data?.success) {
      toast.success("Password changed successfully", { id: passwordUpdateId });
      logout();
    }

    if (result?.error) {
      toast.error(result?.error?.data?.message || "Something went wrong", {
        id: passwordUpdateId,
      });
      setErrorMessage(result?.error?.data?.message || "Something went wrong");
      setErrorModalOpen(true);
    }
  };

  // Update User Name
  const handleNameUpdate = async (event) => {
    event.preventDefault();
    toast.loading("Updating Name...", { id: nameUpdateId });

    const updatedName = event.target.name?.value;

    if (!updatedName) {
      toast.error("Name cannot be empty", { id: nameUpdateId });
      return;
    }

    if (updatedName === userData?.data?.name) {
      toast.error("Name cannot be same as old name", { id: nameUpdateId });
      return;
    }

    const result = await updateUserName({
      id: userData?.data?.id,
      data: { name: updatedName },
    });

    if (result?.data?.success) {
      toast.success("Name updated successfully", { id: nameUpdateId });
      setEditName(false);
    }
    if (result?.error) {
      toast.error(result?.error?.data?.message || "Something went wrong", {
        id: nameUpdateId,
      });
    }
  };

  const password = watch("newPassword");

  return (
    <div className="w-full max-w-lg shadow-md rounded-md mx-auto mb-40 md:p-8 p-4">
      <div>
        <h1 className="text-lg font-semibold text-tColor mb-2 text-center">
          User Profile
        </h1>
      </div>
      <div className="my-4">
        <Link
          to="/manage-devices"
          className="text-blue-500 text-sm hover:underline"
        >
          Check Your Logged In Devices
        </Link>
      </div>
      <div className="mt-2">
        <label htmlFor="name" className="text-sm font-semibold text-tColor">
          Name
        </label>
        <div className={`items-center ${editName ? "hidden" : "flex"}`}>
          {isLoadingUser ? (
            <div className="relative">
              <div className="absolute top-0 left-0 h-4 w-4 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            </div>
          ) : (
            <>
              <p className="text-base font-medium text-tColor inline-block mr-2">
                {userData?.data?.name}
              </p>
              <span
                className="text-base inline text-blue-500 cursor-pointer"
                onClick={() => setEditName(true)}
              >
                Edit
              </span>
            </>
          )}
        </div>
        <form
          onSubmit={(e) => handleNameUpdate(e)}
          className={`items-center gap-2 ${editName ? "flex" : "hidden"}`}
        >
          <input
            type="text"
            placeholder="Name"
            defaultValue={userData?.data?.name}
            id="name"
            required
            name="name"
            className="w-full px-4 py-1 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
          />
          <button className="bg-primary text-gray-100 text-sm font-semibold px-3 py-1 rounded-md hover:opacity-90">
            {isLoadingUpdateUserName ? "Updating..." : "Update"}
          </button>
          <GiCancel
            className="text-red-500 cursor-pointer text-4xl"
            onClick={() => setEditName(false)}
          />
        </form>
      </div>
      <div className="my-2 mb-10">
        <label htmlFor="email" className="text-sm font-semibold text-tColor">
          Email
        </label>
        <div>
          <p className="text-base font-medium text-tColor inline-block mr-2">
            {userData?.data?.email}
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center mt-4 gap-2">
          <FaLock className="text-blue-500 text-base" />
          <p className="text-base font-medium text-tColor">Change Password</p>
        </div>
        <div className="mt-4 mb-2">
          <label
            htmlFor="oldPassword"
            className="text-sm font-semibold text-tColor"
          >
            Old Password
          </label>
          <input
            type="password"
            placeholder="Old Password"
            id="oldPassword"
            name="oldPassword"
            {...register("oldPassword", {
              required: "Old Password is required",
            })}
            className={`w-full px-4 py-1 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
              errors.oldPassword ? "border-red-500" : ""
            }`}
          />
          {errors.oldPassword && (
            <span className="text-xs text-red-500">
              {errors.oldPassword.message}
            </span>
          )}
        </div>

        <div className="mt-4 mb-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-semibold text-tColor"
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            id="newPassword"
            name="newPassword"
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 50,
                message: "Password must not exceed 20 characters",
              },
              // pattern: {
              //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/,
              //   message:
              //     "Password must contain at least one number and one special character",
              // },
            })}
            className={`w-full px-4 py-1 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
              errors.newPassword ? "border-red-500" : ""
            }`}
          />
          {errors.newPassword && (
            <span className="text-xs text-red-500">
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div className="mt-4 mb-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-tColor"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full px-4 py-1 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <p className="mt-2 text-red-500 text-xs font-semibold">
          Note: Changing password will logout of your account.
        </p>
        <div className="flex w-full justify-center items-center col-span-2 mt-6">
          <button
            type="submit"
            className={`bg-primary text-gray-100 text-sm font-semibold px-3 py-[5px] rounded-md hover:opacity-90  w-full`}
          >
            {isLoadingChangePassword
              ? "Changing Password..."
              : "Change Password"}
          </button>
        </div>
      </form>
      <ErrorModal
        isOpen={errorModalOpen}
        message={errorMessage}
        onClose={() => {
          setErrorModalOpen(false);
          setErrorMessage("");
        }}
      />
    </div>
  );
};

export default Profile;
