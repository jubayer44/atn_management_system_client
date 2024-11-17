/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { useDeleteTablesMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const TablesDeleteModal = ({ isOpen, onClose }) => {
  const [deleteTables, { isLoading }] = useDeleteTablesMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const inputValue = watch("confirmDelete", "");
  const individualChecked = watch("individual", false);

  const checkboxes = [
    { id: "individual", label: "Individual" },
    { id: "role", label: "Role" },
    { id: "weekend", label: "Weekend" },
    { id: "roster", label: "Roster" },
  ];

  // Watch all checkbox values
  const checkboxValues = checkboxes.map((checkbox) =>
    watch(checkbox.id, false)
  );
  const isAtLeastOneChecked = checkboxValues.some((value) => value); // Check if at least one checkbox is true

  useEffect(() => {
    if (individualChecked) {
      setValue("roster", true);
    } else {
      setValue("roster", false);
    }
  }, [individualChecked, setValue]);

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmDelete, ...checkboxValues } = data;

    const result = await deleteTables(checkboxValues);

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      onClose(false);
      reset();
    }
    if (result?.error) {
      toast.error(result?.error?.data?.message);
    }
  };

  const handleCancel = () => {
    reset();
    onClose(false);
  };

  const isInputValid =
    inputValue === "delete table" && password && isAtLeastOneChecked;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 text-gray-600 scale-0 transition-all duration-300 min-h-screen ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div className="absolute inset-0 bg-gray-600 opacity-50 blur-sm"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg -mt-36 z-10 mx-5 md:w-1/2">
        <div className="text-center">
          <div className="flex justify-center">
            <FaTrash className="text-red-600 text-4xl mb-4" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Delete Tables
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    {...register(checkbox.id)}
                    className={`${
                      checkbox.id === "roster" && individualChecked
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={checkbox.id === "roster" && individualChecked}
                  />
                  <label
                    htmlFor={checkbox.id}
                    className={`text-sm text-tColor font-semibold text-left ${
                      checkbox.id === "roster" && individualChecked
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {checkbox.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="mb-4">
              <p className="text-sm text-tColor font-semibold text-left">
                Type &apos;delete table&apos; to confirm
              </p>
              <input
                type="text"
                {...register("confirmDelete", { required: true })}
                placeholder="delete table"
                className="w-full px-4 py-1 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
              />
              {errors.confirmDelete && (
                <p className="text-red-500 text-sm mt-2 text-left">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm text-tColor font-semibold text-left">
                Enter your password
              </p>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="your password"
                className={`w-full px-4 py-1 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 text-left">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isInputValid || isLoading}
                className={`bg-red-600 text-white py-1 px-4 rounded text-sm ${
                  !isInputValid || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                }`}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TablesDeleteModal;
