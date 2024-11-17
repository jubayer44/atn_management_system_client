/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import RosterForm from "../../components/form/RosterForm";
import ErrorModal from "../../components/modal/ErrorModal";
import { useGetRolesQuery } from "../../redux/features/role/roleApi";
import {
  useGetSingleRosterQuery,
  useUpdateRosterMutation,
} from "../../redux/features/roster/rosterApi";
import { useGetWeekendsQuery } from "../../redux/features/weekend/weekendApi";
import { limit } from "../../utils/constant";

const UpdateRoster = () => {
  window.scrollTo(0, 0);
  const rosterData = useLocation()?.state?.data || {};
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedWeekend, setSelectedWeekend] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadedData, setLoadedData] = useState(rosterData);
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading: isGettingRoster } = useGetSingleRosterQuery(
    params?.id,
    {
      skip: !params?.id,
    }
  );

  const { data: rolesData, isLoading: isLoadingRoles } = useGetRolesQuery({
    limit,
  });
  const { data: weekendsData, isLoading: isLoadingWeekends } =
    useGetWeekendsQuery({ limit });
  const [updateRoster, { isLoading }] = useUpdateRosterMutation();
  const toastId = "updatingRosterData";

  const handleUpdate = async (e) => {
    toast.loading("Submitting...", { id: toastId });
    e.preventDefault();
    const formData = {};
    if (loadedData?.roleId !== selectedRole) {
      formData.roleId = selectedRole;
    }
    if (loadedData?.weekendId !== selectedWeekend) {
      formData.weekendId = selectedWeekend;
    }
    if (Object.keys(formData).length === 0) {
      toast.error("You haven't made any changes", { id: toastId });
      toast.dismiss(toastId);
      return;
    }
    const result = await updateRoster({
      id: loadedData?.id,
      data: formData,
    });
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Roster updated successfully", {
        id: toastId,
      });
      toast.dismiss(toastId);
      navigate("/manage-roster", { state: "redirected" });
    } else if (result?.error) {
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message || "An error occurred");
      toast.dismiss(toastId);
    }
  };

  const weekendOptions = weekendsData?.data?.map((item) => ({
    value: item.id,
    label: `${item.weekendNo} - ${item.dateBegin}`,
  }));

  const roleOptions = rolesData?.data?.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  useEffect(() => {
    if (Object.keys(rosterData).length === 0) {
      setLoadedData(data?.data || {});
    }
  }, [data]);

  const disabledState = weekendOptions?.length < 1 || roleOptions?.length < 1;

  return (
    <>
      <div
        className="flex justify-center w-full"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Update Roster
          </h1>
          {!Object.keys(rosterData).length && isGettingRoster ? (
            <p className="text-base text-center my-5">Loading...</p>
          ) : (
            <form
              onSubmit={(e) => handleUpdate(e)}
              className={`max-w-md mx-auto`}
            >
              <RosterForm
                isLoadingRoles={isLoadingRoles}
                isLoadingWeekends={isLoadingWeekends}
                roleOptions={roleOptions}
                weekendOptions={weekendOptions}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                selectedWeekend={selectedWeekend}
                setSelectedWeekend={setSelectedWeekend}
                data={loadedData}
              />

              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  disabled={disabledState}
                  className={`w-full md:w-1/2 px-4 py-1 text-base font-medium text-gray-100 rounded-lg bg-primary ${
                    disabledState
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

export default UpdateRoster;
