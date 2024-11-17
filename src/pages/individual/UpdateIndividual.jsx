/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleIndividualQuery,
  useUpdateIndividualMutation,
} from "../../redux/features/individual/individualApi";
import ErrorModal from "../../components/modal/ErrorModal";
import IndividualForm from "../../components/form/IndividualForm";
import { useDispatch } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const UpdateIndividual = () => {
  const individualData = useLocation()?.state?.data || {};
  const [selectedGender, setSelectedGender] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadedData, setLoadedData] = useState(individualData);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { data: indData, isLoading: isGettingIndividual } =
    useGetSingleIndividualQuery(params?.id, { skip: !params.id });
  const [updateIndividual, { isLoading }] = useUpdateIndividualMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toastId = "submitData";

  const onSubmit = async (data) => {
    setIsSubmit(true);
    if (!selectedGender) return;
    toast.loading("Submitting...", {
      id: toastId,
    });
    const formData = {
      id: loadedData?.id || "",
      data: {
        ...data,
        gender: selectedGender,
      },
    };

    const result = await updateIndividual(formData);
    if (result?.data?.success) {
      setIsSubmit(false);
      toast.success(
        result?.data?.message || "Individual updated successfully",
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

  useEffect(() => {
    if (Object.keys(individualData).length === 0) {
      setLoadedData(indData?.data || {});
    }
  }, [indData]);

  return (
    <>
      <div
        className="flex justify-center w-full relative"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Update Individual
          </h1>

          {!Object.keys(individualData).length && isGettingIndividual ? (
            <p className="text-base text-center my-5">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <IndividualForm
                data={loadedData}
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
                  className={`w-full md:w-1/2 lg:w-1/3 px-4 py-1 taxt-base font-medium text-gray-100 bg-primary hover:opacity-90 rounded-lg ${
                    isLoading ? "cursor-not-allowed opacity-60" : ""
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

export default UpdateIndividual;
