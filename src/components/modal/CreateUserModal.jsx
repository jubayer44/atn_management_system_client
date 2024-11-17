/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
import { toast } from "sonner";
import UserForm from "../form/UserForm";
import { useCreateUserMutation } from "../../redux/features/user/userApi";

const CreateUserModal = ({
  isOpen,
  onClose,

  setOpenErrorModal,
  setErrorMessage,
}) => {
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const toastId = "create-user";

  const onSubmit = async (data) => {
    toast.loading("Creating User...", { id: toastId });
    delete data.confirmPassword;

    const result = await createUser({
      ...data,
      role: data?.role?.toUpperCase(),
    });
    if (result?.data?.success) {
      toast.success("User created successfully", { id: toastId });
      reset();
      onClose();
    }
    if (result?.error) {
      toast.dismiss(toastId);
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message || "Something went wrong");
      onClose();
    }
  };

  const password = watch("password");

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
            onClick={() => {
              reset();
              onClose();
            }}
          />
        </p>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Create New User</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserForm register={register} errors={errors} password={password} />

          <div className="flex w-full justify-center items-center col-span-2 mt-2">
            <button
              type="submit"
              disabled={isCreating}
              className={`bg-primary text-gray-100 text-sm font-semibold px-3 py-[5px] rounded-md w-full ${
                isCreating
                  ? "cursor-not-allowed opacity-60"
                  : "hover:opacity-90"
              }`}
            >
              {isCreating ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
