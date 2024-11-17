/* eslint-disable react-hooks/exhaustive-deps */
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import RoleForm from "../../components/form/RoleForm";
import {
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
} from "../../redux/features/role/roleApi";
import { useEffect, useState } from "react";
import ErrorModal from "../../components/modal/ErrorModal";
import { useDispatch } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const UpdateRole = () => {
  window.scrollTo(0, 0);
  const stateData = useLocation()?.state?.data || {};
  const { id } = useParams();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadedData, setLoadedData] = useState(stateData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: roleData, isLoading: isGettingRole } = useGetSingleRoleQuery(
    id,
    { skip: !id }
  );
  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toastId = "create-role";
  const onSubmit = async (data) => {
    toast.loading("Creating Role...", { id: toastId });

    const formData = {
      ...(data?.name !== loadedData?.name ? { name: data?.name } : {}),
      ...(data?.abbreviation !== loadedData?.abbreviation
        ? { abbreviation: data?.abbreviation }
        : {}),
    };

    if (Object.keys(formData).length === 0) {
      toast.error("You haven't made any changes", { id: toastId });
      return;
    }

    const result = await updateRole({ id: loadedData?.id, data: formData });
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Role Updated successfully", {
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

  useEffect(() => {
    if (Object.keys(stateData).length === 0) {
      setLoadedData(roleData?.data || {});
    }
  }, [roleData]);

  return (
    <>
      <div
        className="flex justify-center w-full"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Update Role
          </h1>

          {!Object.keys(stateData).length && isGettingRole ? (
            <p className="text-base text-center my-5">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <RoleForm
                register={register}
                errors={errors}
                roleData={loadedData}
              />

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
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
        <ErrorModal
          isOpen={openErrorModal}
          message={errorMessage}
          onClose={() => {
            setOpenErrorModal(false);
            setErrorMessage("");
          }}
        />
      </div>
    </>
  );
};

export default UpdateRole;
