import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import TripForm from "../../components/form/TripForm";
import ErrorModal from "../../components/modal/ErrorModal";

const AddNewTrip = () => {
  window.scrollTo(0, 0);

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const disabledState = false;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
