import { useState } from "react";

import { Controller, useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TripForm from "../../components/form/TripForm";
import ErrorModal from "../../components/modal/ErrorModal";
import { useUpdateTimeSheetMutation } from "../../redux/features/timeSheet/timeSheetApi";
import { getUserInfo } from "../../services/authServices";
import { parse } from "date-fns";

const UpdateTrip = () => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const defaultData = useLocation()?.state?.data;
  const [updateTimeSheet, { isLoading }] = useUpdateTimeSheetMutation();

  const role = getUserInfo()?.role;

  const navigate = useNavigate();

  const formData = new FormData();

  const disabledState = isLoading;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tripStartTime:
        defaultData?.tripStartTime &&
        parse(defaultData?.tripStartTime, "hh:mm aa", new Date()),
    },
  });

  const onSubmit = async (data) => {
    const updatePayload = {
      date: data.date || defaultData?.date,
      tripId: data.tripId || defaultData?.tripId,
      tripStartTime: data.tripStartTime || defaultData?.tripStartTime,
      tripEndTime: data.tripEndTime || defaultData?.tripEndTime,
      hourlyRate: Number(data.hourlyRate) || Number(defaultData?.hourlyRate),
      memo: data.memo || defaultData?.memo,
    };

    if (data?.tripReceipt?.name) {
      formData.append("file", data.tripReceipt);
    }
    formData.append("data", JSON.stringify(updatePayload));

    const result = await updateTimeSheet({
      id: defaultData?.id,
      data: formData,
    });

    if (result?.data?.success) {
      toast.success("Trip updated successfully");
      setOpenErrorModal(false);
      setErrorMessage("");
      navigate(role === "admin" ? "/manage-time-sheet" : "/my-time-sheet");
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
            Update Trip
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <TripForm
              register={register}
              errors={errors}
              control={control}
              Controller={Controller}
              useWatch={useWatch}
              setValue={setValue}
              defaultData={defaultData}
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
                {disabledState ? "Updating..." : "Update"}
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

export default UpdateTrip;
