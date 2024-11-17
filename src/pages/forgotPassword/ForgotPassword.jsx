import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../components/modal/ErrorModal";
import forgotPassword from "../../services/actions/forgotPassword";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await forgotPassword(data);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-4">
        <h2 className="text-2xl font-bold text-center text-tColor">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600">
          Enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full p-2 text-white bg-primary rounded-md ${
              isLoading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
            }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>

        <p className="text-center text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="flex items-center justify-center mx-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
          <div className="flex items-center">
            <FaEnvelope
              className="h-6 w-6 text-blue-500 mr-2"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold">Email Sent</h2>
          </div>
          <p className="mt-2 text-gray-600">
            A password reset link has been sent to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            If you don’t see the email, please check your spam or junk folder.
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

export default ForgotPassword;
