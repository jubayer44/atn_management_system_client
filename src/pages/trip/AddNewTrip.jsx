import { useState } from "react";

import { Controller, useForm, useWatch } from "react-hook-form";
import TripForm from "../../components/form/TripForm";
import ErrorModal from "../../components/modal/ErrorModal";
import { useAddNewTimeSheetMutation } from "../../redux/features/timeSheet/timeSheetApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddNewTrip = () => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addNewTimeSheet, { isLoading }] = useAddNewTimeSheetMutation();

  const navigate = useNavigate();

  const formData = new FormData();

  const disabledState = isLoading;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      date: data.date,
      tripId: data.tripId,
      tripStartTime: data.tripStartTime,
      tripEndTime: data.tripEndTime,
      hourlyRate: Number(data.hourlyRate),
      memo: data.memo,
    };
    formData.append("file", data.tripReceipt);
    formData.append("data", JSON.stringify(payload));
    const result = await addNewTimeSheet(formData);

    if (result?.data?.success) {
      toast.success("Trip added successfully");
      reset();
      setOpenErrorModal(false);
      setErrorMessage("");
      navigate("/my-time-sheet");
    }
    if (result?.error) {
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
            Add New Trip
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <TripForm
              register={register}
              errors={errors}
              control={control}
              Controller={Controller}
              useWatch={useWatch}
              setValue={setValue}
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
                {disabledState ? "Submitting" : "Submit"}
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

export default AddNewTrip;
