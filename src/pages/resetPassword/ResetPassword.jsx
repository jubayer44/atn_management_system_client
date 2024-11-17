import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/modal/ErrorModal";
import resetPassword from "../../services/actions/resetPassword";
import { FaCheckCircle } from "react-icons/fa";

const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const token = params.get("token");
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const password = data?.newPassword;

    const result = await resetPassword({ data: { password, id }, token });
    if (result?.success) {
      setIsLoading(false);
      openModal();
      reset();
    }
    if (result?.error) {
      setIsLoading(false);
      setOpenErrorModal(true);
      setErrorMessage(result?.message || "Something went wrong");
    }
  };

  const password = watch("newPassword");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decoded.exp < currentTime) {
          setMessage("Your reset link has expired. Please request a new one.");
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        navigate("/notFound", { replace: true });
      }
    }

    if (!token || !id) {
      navigate("/notFound", { replace: true });
    }
  }, [token, navigate, id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {message && (
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold mb-8">{message}</p>
          <Link
            to="/login"
            className="text-blue-500 hover:underline text-base font-bold"
          >
            Click here to login
          </Link>
        </div>
      )}

      {!message && (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-4">
          <h2 className="text-2xl font-bold text-center text-tColor">
            Reset Your Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
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
                })}
                className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              {errors.newPassword && (
                <span className="text-xs text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                {...register("confirmNewPassword", {
                  required: "Confirm New Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                  errors.confirmNewPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmNewPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-2 text-white bg-primary rounded-md ${
                isLoading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="flex items-center justify-center mx-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
          <div className="flex items-center">
            <FaCheckCircle
              className="h-6 w-6 text-green-500 mr-2"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold">Password Reset Successful</h2>
          </div>
          <p className="mt-2 text-gray-600">
            Your password has been reset successfully! You can now log in with
            your new password.
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={closeModal}
              className="px-4 py-1 bg-primary text-white rounded"
            >
              Okay
            </button>
          </div>
        </div>
      </Modal>

      <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => {
          setOpenErrorModal(false);
          setErrorMessage("");
        }}
      />
    </div>
  );
};

export default ResetPassword;
