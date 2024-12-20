/* eslint-disable react/prop-types */

import DatePicker from "react-datepicker";
import Spinner from "../loading/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import {
  AiOutlineCalendar,
  AiOutlineCamera,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { parse } from "date-fns";
import {
  useGetAllEmployeesQuery,
  useGetMyProfileQuery,
} from "../../redux/features/user/userApi";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { getUserInfo } from "../../services/authServices";
import { userRole } from "../../utils/constant";

const TripForm = ({
  register = null,
  errors = null,
  control,
  Controller,
  useWatch,
  setValue,
  defaultData,
  selectedUser,
  setSelectedUser,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const pathName = useLocation()?.pathname;
  const role = getUserInfo()?.role;
  const { data: profileData, isLoading: isUserLoading } =
    useGetMyProfileQuery();

  const { data: employees, isLoading: isEmployeeLoading } =
    useGetAllEmployeesQuery({ skip: role !== userRole.admin });

  const userOptions = employees?.data?.length
    ? employees?.data?.map((user) => ({
        value: user.id, // assuming each user has a unique 'id'
        label: user.name, // displaying user name in the select dropdown
      }))
    : [];

  const startTime = useWatch({
    control,
    name: "tripStartTime", // Watch the tripStartTime field
  });

  // Set maxTime to the end of the day if startTime is available
  const maxTime = startTime
    ? new Date(startTime).setHours(23, 59, 59, 999)
    : undefined;

  const tripData = {
    ...defaultData,
    date:
      defaultData?.date && parse(defaultData.date, "dd/MM/yyyy", new Date()),
    tripStartTime:
      defaultData?.tripStartTime &&
      parse(defaultData?.tripStartTime, "hh:mm aa", new Date()),
    tripEndTime:
      defaultData?.tripEndTime &&
      parse(defaultData?.tripEndTime, "hh:mm aa", new Date()),
    tripReceipt: defaultData?.tripReceipt && defaultData?.tripReceipt,
  };

  // Handle file change (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview URL
        setValue("tripReceipt", file);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  // Handle image removal (clear preview and input)
  const handleImageRemove = () => {
    setImagePreview(null);
    setValue("tripReceipt", null);
    // document.getElementById("imageUpload").value = "";
  };

  useEffect(() => {
    if (tripData?.tripReceipt) {
      setImagePreview(tripData?.tripReceipt);
      setValue("tripReceipt", tripData?.tripReceipt);
    }
  }, [tripData?.tripReceipt, setValue]);

  const isNewTripPage = pathName === "/new-trip" || pathName === "/new-trip/";
  const isNewTripAdmin =
    pathName === "/new-trip-admin" || pathName === "/new-trip-admin/";
  const loadingHourlyRate = isNewTripPage && isUserLoading;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="col-span-1">
        <label
          htmlFor="tripId"
          className="block text-sm font-medium text-tColor"
        >
          Trip ID <span className="text-red-500 text-base">*</span>
        </label>

        <input
          type="text"
          placeholder="T0001"
          defaultValue={tripData?.tripId}
          id="tripId"
          name="tripId"
          {...register("tripId", {
            required: "Trip ID is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.tripId ? "border-red-500" : ""
          }`}
        />
        {errors.tripId && (
          <span className="text-xs text-red-500">{errors.tripId.message}</span>
        )}
      </div>

      <div className="w-full col-span-1">
        <label htmlFor="date" className="block text-sm font-medium text-tColor">
          Date <span className="text-red-500 text-base">*</span>
        </label>

        <div className="w-full relative mt-2 flex items-center">
          <Controller
            control={control}
            name="date"
            rules={{ required: "Date is required" }}
            defaultValue={tripData?.date}
            render={({ field }) => (
              <DatePicker
                placeholderText="dd-mm-yyyy"
                onChange={(date) => {
                  field.onChange(date);
                }}
                selected={field.value}
                dateFormat="dd-MM-yyyy"
                className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
              />
            )}
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <AiOutlineCalendar className="text-gray-400" />
          </div>
        </div>

        {errors.date && (
          <span className="text-xs text-red-500">{errors.date.message}</span>
        )}
      </div>

      {/* Trip Start Time with Time Picker (AM/PM format) */}
      <div className="w-full col-span-1">
        <label
          htmlFor="tripStartTime"
          className="block text-sm font-medium text-tColor"
        >
          Trip Start Time <span className="text-red-500 text-base">*</span>
        </label>

        <div className="w-full relative mt-2 flex items-center">
          <Controller
            control={control}
            name="tripStartTime"
            rules={{ required: "Trip Start Time is required" }}
            defaultValue={tripData?.tripStartTime}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(time) => field.onChange(time)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="hh:mm aa" // AM/PM format
                timeIntervals={10} // 10-minute intervals
                dateFormat="hh:mm aa" // Format the date to show just time (AM/PM)
                placeholderText="10:00 AM"
                className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
              />
            )}
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <AiOutlineClockCircle className="text-gray-400" />
          </div>
        </div>

        {errors.tripStartTime && (
          <span className="text-xs text-red-500">
            {errors.tripStartTime.message}
          </span>
        )}
      </div>

      {/* Trip End Time with Time Picker (AM/PM format) */}
      <div className="w-full col-span-1">
        <label
          htmlFor="tripEndTime"
          className="block text-sm font-medium text-tColor"
        >
          Trip End Time <span className="text-red-500 text-base">*</span>
        </label>

        <div className="w-full relative mt-2 flex items-center">
          <Controller
            control={control}
            name="tripEndTime"
            rules={{ required: "Trip End Time is required" }}
            defaultValue={tripData?.tripEndTime}
            render={({ field }) => {
              // Calculate the minTime based on the selected start time
              const minTime = startTime ? new Date(startTime) : undefined;

              return (
                <DatePicker
                  selected={field.value}
                  onChange={(time) => field.onChange(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="hh:mm aa" // AM/PM format
                  timeIntervals={10} // 10-minute intervals
                  dateFormat="hh:mm aa" // Format the date to show just time (AM/PM)
                  placeholderText="12:00 PM"
                  minTime={minTime} // Disable times before the start time
                  maxTime={maxTime} // Disable times after the end of the day
                  className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
                />
              );
            }}
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <AiOutlineClockCircle className="text-gray-400" />
          </div>
        </div>

        {errors.tripEndTime && (
          <span className="text-xs text-red-500">
            {errors.tripEndTime.message}
          </span>
        )}
      </div>

      {/* Hourly Rate Section */}

      <div className="col-span-2">
        <label
          htmlFor="hourlyRate"
          className="block text-sm font-medium text-tColor"
        >
          Hourly Rate <span className="text-red-500 text-base">*</span>
        </label>
        {loadingHourlyRate ? (
          <Spinner />
        ) : (
          <div className="relative">
            <span className="absolute inset-y-0 left-[10px] text-tColor top-[8px] z-10 flex items-center pointer-events-none">
              $
            </span>
            <input
              type="number"
              placeholder="20.00"
              defaultValue={
                isNewTripPage && !isNewTripAdmin
                  ? profileData?.data?.hourlyRate
                  : tripData?.hourlyRate
              }
              id="hourlyRate"
              name="hourlyRate"
              {...register("hourlyRate", {
                required: "Hourly Rate is required",
                min: {
                  value: 1,
                  message: "Hourly Rate must be at least `",
                },
              })}
              className={`pl-6 w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                errors.hourlyRate ? "border-red-500" : ""
              }`}
            />
          </div>
        )}
        {errors.hourlyRate && (
          <span className="text-xs text-red-500">
            {errors.hourlyRate.message}
          </span>
        )}
      </div>

      {/* User Select Section */}
      {isNewTripAdmin && (
        <div className="col-span-2">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-tColor"
          >
            Employee <span className="text-red-500 text-base">*</span>
          </label>
          <div>
            <Controller
              control={control}
              name="userId" // Make sure the name matches the field name in your form
              rules={{ required: "Employee is required" }} // Set the field as required
              defaultValue={selectedUser?.value || ""}
              render={({ field }) => (
                <Select
                  {...field} // Spread field to make the select work with react-hook-form
                  options={userOptions}
                  value={userOptions.find(
                    (option) => option.value === field.value
                  )} // Map the value to selected option
                  onChange={(selectedOption) => {
                    // When a user selects an option, update the field value in the form
                    field.onChange(selectedOption ? selectedOption.value : "");
                    setSelectedUser(selectedOption); // Optionally update the selectedUser state
                  }}
                  isSearchable={true}
                  placeholder="Select an Employee"
                  isLoading={isEmployeeLoading}
                  className={`w-full mt-2 text-tColor bg-white text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      borderRadius: "8px",
                    }),
                  }}
                />
              )}
            />
          </div>
          {errors.userId && (
            <span className="text-xs text-red-500">
              {errors.userId.message}
            </span>
          )}
        </div>
      )}

      {/* Custom Image Upload Section */}
      <div className="w-full col-span-2">
        <label
          htmlFor="imageUpload"
          className="block text-sm font-medium text-tColor"
        >
          Trip Receipt
        </label>

        <div className="w-full relative mt-2">
          {/* Image Preview with Remove Option */}
          {imagePreview ? (
            <div className="mt-4 w-full flex justify-center relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-56 object-cover rounded-lg border-2 border-gray-300"
              />
              {/* Close Icon to Remove Image */}
              <button
                type="button"
                onClick={handleImageRemove}
                className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700"
              >
                <AiOutlineCloseCircle className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                {...register("imageUpload")}
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <AiOutlineCamera className="text-gray-500 text-3xl mb-2" />
                <span className="text-sm text-gray-500">
                  Click or Drag to Upload
                </span>
              </div>
            </div>
          )}

          {errors.imageUpload && (
            <span className="text-xs text-red-500">
              {errors.imageUpload.message}
            </span>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="memo" className="block text-sm font-medium text-tColor">
          Memo
        </label>

        <textarea
          cols={3}
          placeholder="Memo"
          defaultValue={tripData?.memo}
          id="memo"
          name="memo"
          {...register("memo")}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.memo ? "border-red-500" : ""
          }`}
        />
        {errors.memo && (
          <span className="text-xs text-red-500">{errors.memo.message}</span>
        )}
      </div>
    </div>
  );
};

export default TripForm;
