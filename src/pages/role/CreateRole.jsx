import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RoleForm from "../../components/form/RoleForm";
import { useCreateRoleMutation } from "../../redux/features/role/roleApi";
import { useState } from "react";
import ErrorModal from "../../components/modal/ErrorModal";
import { useDispatch } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const CreateRole = () => {
  window.scrollTo(0, 0);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toastId = "create-role";
  const onSubmit = async (data) => {
    toast.loading("Creating Role...", { id: toastId });

    const result = await createRole(data);
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Role created successfully", {
        id: toastId,
      });
      dispatch(setTable("Role"));
      navigate("/manage-roster", { state: "redirected" });
    } else if (result?.error) {
      toast.dismiss(toastId);
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className="flex justify-center w-full"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Create New Role
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <RoleForm register={register} errors={errors} />

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full md:w-1/2 lg:w-1/3 px-4 py-1 text-base font-medium text-gray-100 bg-primary rounded-lg ${
                  isLoading
                    ? "cursor-not-allowed opacity-60"
                    : "hover:opacity-90"
                }`}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
        <ErrorModal
          isOpen={openErrorModal}
          message={errorMessage}
          onClose={() => setOpenErrorModal(false)}
        />
      </div>
    </>
  );
};

export default CreateRole;
