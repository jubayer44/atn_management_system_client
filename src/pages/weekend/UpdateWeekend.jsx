/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import WeekendForm from "../../components/form/WeekendForm";
import ErrorModal from "../../components/modal/ErrorModal";
import {
  useGetSingleWeekendQuery,
  useUpdateWeekendMutation,
} from "../../redux/features/weekend/weekendApi";
import { formateDate } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setTable } from "../../redux/features/roster/rosterSlice";

const UpdateWeekend = () => {
  window.scrollTo(0, 0);
  const weekData = useLocation()?.state?.data || {};
  const { id } = useParams();
  const [loadedData, setLoadedData] = useState(weekData);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: weekend, isLoading: isGettingWeekend } =
    useGetSingleWeekendQuery(id, { skip: !id });

  const weekendData = {
    ...loadedData,
    weekendNo: loadedData?.weekendNo && loadedData?.weekendNo?.split(" ")[1],
  };
  const [updateWeekend, { isLoading }] = useUpdateWeekendMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const toastId = "update-weekend";
  const onSubmit = async (data) => {
    toast.loading("Updating weekend...", { id: toastId });
    const formData = {
      ...(data?.weekendNo !== weekendData?.weekendNo
        ? { weekendNo: `Weekend ${data.weekendNo}` }
        : {}),
      ...(data?.layDirector !== weekendData?.layDirector
        ? { layDirector: data.layDirector }
        : {}),
      ...(data?.description !== weekendData?.description
        ? { description: data.description }
        : {}),
      ...(formateDate(data?.dateBegin) !== weekendData?.dateBegin
        ? { dateBegin: formateDate(data.dateBegin) }
        : {}),
      ...(formateDate(data?.dateEnd) !== weekendData?.dateEnd
        ? { dateEnd: formateDate(data.dateEnd) }
        : {}),
    };

    if (Object.keys(formData).length === 0) {
      toast.error("You haven't made any changes", { id: toastId });
      toast.dismiss(toastId);
      return;
    }
    const result = await updateWeekend({ id: loadedData?.id, data: formData });
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Weekend updated successfully", {
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

  useEffect(() => {
    if (Object.keys(weekData).length === 0) {
      setLoadedData(weekend?.data || {});
    }
  }, [weekend]);

  return (
    <>
      <div
        className="flex justify-center w-full"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="w-full p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-lg font-semibold text-tColor text-center mb-10">
            Update Weekend
          </h1>

          {!Object.keys(weekData).length && isGettingWeekend ? (
            <p className="text-base text-center my-5">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <WeekendForm
                weekendData={weekendData}
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
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          )}
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

export default UpdateWeekend;
