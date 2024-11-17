import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import IndividualForm from "../../components/form/IndividualForm";
import ErrorModal from "../../components/modal/ErrorModal";
import { useCreateIndividualMutation } from "../../redux/features/individual/individualApi";
import { useDispatch } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const CreateIndividual = () => {
  window.scrollTo(0, 0);
  // const [selectedRole, setSelectedRole] = useState("");
  // const [selectedWeekend, setSelectedWeekend] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createIndividual, { isLoading }] = useCreateIndividualMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toastId = "submitIndividualData";

  const onSubmit = async (data) => {
    setIsSubmit(true);
    if (!selectedGender) return;
    toast.loading("Creating...", {
      id: toastId,
    });
    const formData = {
      ...data,
      gender: selectedGender,
    };

    const result = await createIndividual(formData);
    if (result?.data?.success) {
      setIsSubmit(false);
      toast.success(
        result?.data?.message || "Individual created successfully",
        {
          id: toastId,
        }
      );
      dispatch(setTable("Individual"));
      navigate("/manage-roster", { state: "redirected" });
    } else if (result?.error) {
      toast.dismiss(toastId);
      setIsSubmit(false);
      setOpenErrorModal(true);
      setErrorMessage(result?.error?.data?.message);
    }
  };

  return (
    <>
      <div
        className="flex justify-center w-full relative"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Create New Individual
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <IndividualForm
              data={null}
              register={register}
              errors={errors}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              isSubmit={isSubmit}
            />

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full md:w-1/2 lg:w-1/3 px-4 py-1 text-base font-medium text-gray-100 bg-primary hover:opacity-90 rounded-lg ${
                  isLoading ? "cursor-not-allowed opacity-60" : ""
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
          onClose={() => {
            setOpenErrorModal(false);
            setErrorMessage("");
          }}
        />
      </div>
    </>
  );
};

export default CreateIndividual;
