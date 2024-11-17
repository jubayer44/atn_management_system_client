/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../../redux/features/user/userApi";

const UpdateUserModal = ({
  isOpen,
  onClose,
  updateData,
  setOpenErrorModal,
  setErrorMessage,
}) => {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const name = updateData?.name;

  // const role = capitalizeFirstLetter(updateData?.role);
  const role = updateData?.role.toLowerCase();

  const toastId = "update-user";

  const onSubmit = async (data) => {
    toast.loading("Updating User...", { id: toastId });
    if (
      updateData?.name === data?.name &&
      updateData?.role?.toLowerCase() === data?.role
    ) {
      toast.error("You did not make any changes", { id: toastId });
      return;
    }

    const result = await updateUser({
      id: updateData?.id,
      data: {
        name: data?.name,
        role: data?.role.toUpperCase(),
      },
    });

    if (result?.data?.success) {
      toast.success(result?.data?.message, { id: toastId });
      onClose();
    }
    if (result?.error) {
      toast.error(result?.error?.data?.message, { id: toastId });
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message || "Something went wrong");
      onClose();
    }
  };

  if (!updateData?.name) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 text-gray-600 scale-0 transition-all duration-300 min-h-screen ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div className="absolute inset-0 bg-gray-600 opacity-50 blur-sm"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-sm z-10 mx-5 md:min-w-96 w-full max-w-lg">
        <p className="absolute top-2 right-2 z-10">
          <GiCancel
            className="text-red-500 text-2xl font-bold cursor-pointer"
            onClick={onClose}
          />
        </p>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Update User</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2 relative">
              <label
                htmlFor="updateName"
                className="block text-xs font-medium text-tColor"
              >
                Name <span className="text-red-500 text-base">*</span>
              </label>

              <input
                type="text"
                defaultValue={name}
                id="updateName"
                name="name"
                {...register("name", {
                  required: "Name is required",
                })}
                className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 absolute left-0 -bottom-5">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="col-span-2 relative">
              <label
                htmlFor="updateRole"
                className="block text-xs font-medium text-tColor"
              >
                Role <span className="text-red-500 text-base">*</span>
              </label>

              <select
                name="role"
                defaultValue={role}
                id="updateRole"
                {...register("role", {
                  required: "Role is required",
                })}
                className="w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <span className="text-xs text-red-500 absolute left-0 -bottom-5">
                  {errors.role.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full justify-center items-center col-span-2 mt-2">
            <button
              disabled={isUpdating}
              type="submit"
              className={`bg-primary text-gray-100 text-sm font-semibold px-3 py-[5px] rounded-md w-full ${
                isUpdating
                  ? "cursor-not-allowed opacity-60"
                  : "hover:opacity-90"
              }`}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
