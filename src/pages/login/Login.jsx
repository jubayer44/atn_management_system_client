import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaHome } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import loginUser from "../../services/actions/loginUser";
import { storeUser } from "../../services/authServices";
import Cookies from "js-cookie";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const closeModal = () => {
    setIsOpen(false);
    setErrorMessage("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    let browserInfo = {};

    try {
      const getBrowserInfo = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=8dfe4fbe87a3402785d13501ae90dd1f`
      );
      const info = await getBrowserInfo.json();

      if (info?.ip) {
        browserInfo.city = info?.city || "Unknown City";
        browserInfo.country = info?.country_name || "Unknown Country";
      }
    } catch (error) {
      console.log(error);
    }

    const loginData = {
      ...data,
      ...browserInfo,
    };

    try {
      const result = await loginUser(loginData);
      if (result?.success) {
        toast.success("Login successful");
        setLoading(false);
        storeUser({ accessToken: result?.data?.accessToken });
        Cookies.set("accessSession", result?.data?.sessionId);
        navigate(from, { replace: true });
      }

      if (result?.error) {
        setLoading(false);
        setIsOpen(true);
        setErrorMessage(result?.message);
        setErrorStatus(result?.error?.statusCode);
        toast.error(result?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="antialiased bg-gray-200 text-tColor h-screen w-full">
      <div className="p-3 w-full bg-primary text-gray-100">
        <Link to="/" className="flex items-center gap-1">
          <FaHome className="text-2xl" />
          <h4 className="text-xl font-bold">Home</h4>
        </Link>
      </div>
      <Toaster position="top-center" />
      <div className="flex items-center h-[90vh]">
        <div className="w-full bg-white  rounded-lg shadow-md p-8 m-4 md:max-w-md md:mx-auto">
          <h1 className="text-2xl font-bold text-tColor mb-2 text-center">
            Log In
          </h1>
          <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-sm mb-1 font-[500]">
                Email
              </label>
              <input
                className={`w-full border border-primary rounded p-2 outline-none focus:shadow-outline focus:border-blue-500 focus:scale-105 transition-all duration-300 ease-in-out ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4 md:w-full">
              <label
                htmlFor="password"
                className="block text-sm mb-1 font-[500]"
              >
                Password
              </label>
              <input
                className={`w-full border border-primary rounded p-2 outline-none focus:shadow-outline focus:border-blue-500 focus:scale-105 transition-all duration-300 ease-in-out ${
                  errors.password ? "border-red-500" : ""
                }`}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  // minLength: {
                  //   value: 6,
                  //   message: "Password must be at least 6 characters",
                  // },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errorStatus === 401 && (
              <p className="text-red-500 text-sm font-semibold mb-2">
                {errorMessage}
              </p>
            )}
            <button
              disabled={loading}
              className={`mt-2 w-full p-2 text-white bg-primary rounded-md ${
                loading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <Link
            to="/forgot-password"
            className="text-blue-700 text-center text-sm"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      {errorMessage === "No User found" && (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center">
              <MdError
                className="h-6 w-6 text-red-500 mr-2"
                aria-hidden="true"
              />
              <h2 className="text-lg font-semibold">User Not Found</h2>
            </div>
            <p className="mt-2 text-gray-600">
              We couldn’t find an account associated with that email address.
              Please check the email you entered and try again.
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
      )}
    </div>
  );
};

export default Login;
