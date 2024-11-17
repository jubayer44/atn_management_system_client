import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WeekendForm from "../../components/form/WeekendForm";
import ErrorModal from "../../components/modal/ErrorModal";
import { useCreateWeekendMutation } from "../../redux/features/weekend/weekendApi";
import { formateDate } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const CreateWeekend = () => {
  window.scrollTo(0, 0);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [createWeekend, { isLoading }] = useCreateWeekendMutation();

  const toastId = "create-weekend";
  const onSubmit = async (data) => {
    toast.loading("Creating weekend...", { id: toastId });
    const formData = {
      weekendNo: `Weekend ${data.weekendNo}`,
      layDirector: data.layDirector,
      description: data.description,
      dateBegin: formateDate(data.dateBegin),
      dateEnd: formateDate(data.dateEnd),
    };

    const result = await createWeekend(formData);
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Weekend created successfully", {
        id: toastId,
      });

      dispatch(setTable("Weekend"));
      navigate("/manage-roster", { state: "redirected" });
    } else if (result?.error) {
      setOpenErrorModal(true);
      if (typeof result?.error?.data?.message === "object") {
        setErrorMessage(
          result?.error?.data?.message[0]?.message || "An error occurred"
        );
      } else {
        setErrorMessage(result?.error?.data?.message || "An error occurred");
      }

      toast.dismiss(toastId);
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
            Create New Weekend
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <WeekendForm
              register={register}
              errors={errors}
              control={control}
              Controller={Controller}
            />

            <div className="flex justify-center w-full">
              <button
                disabled={isLoading}
                type="submit"
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
      </div>
      <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => {
          setOpenErrorModal(false);
          setErrorMessage("");
        }}
      />
    </>
  );
};

export default CreateWeekend;
