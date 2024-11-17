import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "sonner";
import RosterForm from "../../components/form/RosterForm";
import ErrorModal from "../../components/modal/ErrorModal";
import { useGetIndividualsQuery } from "../../redux/features/individual/individualApi";
import { useGetRolesQuery } from "../../redux/features/role/roleApi";
import { useCreateRosterMutation } from "../../redux/features/roster/rosterApi";
import { useGetWeekendsQuery } from "../../redux/features/weekend/weekendApi";
import { limit } from "../../utils/constant";
import { setTable } from "../../redux/features/roster/rosterSlice";

const AddToRoster = () => {
  // window.scrollTo(0, 0);
  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [selectedWeekend, setSelectedWeekend] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchParams = {
    ...(searchTerm ? { searchTerm: searchTerm } : {}),
    limit: 20,
  };

  const {
    data: freshIndividuals,
    isLoading: isLoadingIndividuals,
    isFetching: isFetchingIndividual,
    refetch,
  } = useGetIndividualsQuery(searchParams);
  const { data: rolesData, isLoading: isLoadingRoles } = useGetRolesQuery({
    limit,
  });
  const { data: weekendsData, isLoading: isLoadingWeekends } =
    useGetWeekendsQuery({ limit });
  const [createRoster, { isLoading }] = useCreateRosterMutation();

  const toastId = "submitRosterData";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!selectedIndividual || !selectedRole || !selectedWeekend) {
      return;
    }

    toast.loading("Submitting...", {
      id: toastId,
    });

    const formData = {
      individualId: selectedIndividual.value,
      roleId: selectedRole,
      weekendId: selectedWeekend,
    };

    const result = await createRoster(formData);

    if (result?.data?.success) {
      setIsSubmit(false);
      setSelectedIndividual("");
      setSelectedRole("");
      setSelectedWeekend("");
      toast.success(result?.data?.message, {
        id: toastId,
      });
      dispatch(setTable("Roster"));
      refetch();
      navigate("/manage-roster", { state: "redirected" });
    } else if (result?.error) {
      toast.dismiss(toastId);
      setIsSubmit(false);
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message);
      setSelectedIndividual("");
      setSelectedRole("");
      setSelectedWeekend("");
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

  const individualsOptions = freshIndividuals?.data?.map((individual) => ({
    value: individual.id,
    label: individual.name,
  }));
  useEffect(() => {
    if (selectedIndividual) {
      setEmail(
        freshIndividuals?.data?.find(
          (item) => item?.id === selectedIndividual.value
        )?.email
      );
    }
  }, [selectedIndividual, freshIndividuals, isFetchingIndividual]);

  useEffect(() => {
    if (searchValue) {
      setSearchTerm(searchValue);
    }
  }, [searchValue]);

  const disabledState =
    isLoading ||
    individualsOptions?.length < 1 ||
    weekendOptions?.length < 1 ||
    roleOptions?.length < 1;

  return (
    <>
      <div
        className="flex justify-center w-full"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Create To Add
          </h1>

          <form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto">
            <RosterForm
              isSubmit={isSubmit}
              isLoadingIndividuals={isLoadingIndividuals}
              isLoadingRoles={isLoadingRoles}
              isLoadingWeekends={isLoadingWeekends}
              individualsOptions={individualsOptions}
              roleOptions={roleOptions}
              weekendOptions={weekendOptions}
              selectedIndividual={selectedIndividual}
              setSelectedIndividual={setSelectedIndividual}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              selectedWeekend={selectedWeekend}
              setSelectedWeekend={setSelectedWeekend}
              email={email}
              setSearchValue={setSearchValue}
              setSearchTerm={setSearchTerm}
              // searchValue={searchValue}
              isFetchingIndividual={isFetchingIndividual}
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
                {isLoading ? "Adding To Roster..." : "Add To Roster"}
              </button>
            </div>
          </form>
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

export default AddToRoster;
