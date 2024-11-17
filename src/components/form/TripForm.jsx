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
import { useState } from "react";

const TripForm = ({
  register = null,
  errors = null,
  control,
  Controller,
  isLoading = false,
  setValue,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

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

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="w-full col-span-2">
        <label htmlFor="date" className="block text-sm font-medium text-tColor">
          Select Date <span className="text-red-500 text-base">*</span>
        </label>

        <div className="w-full relative mt-2 flex items-center">
          {isLoading && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none z-10">
              <Spinner />
            </div>
          )}
          <Controller
            control={control}
            name="date"
            rules={{ required: "Date Begin is required" }}
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
          {isLoading && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none z-10">
              <Spinner />
            </div>
          )}
          <Controller
            control={control}
            name="tripStartTime"
            rules={{ required: "Trip Start Time is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(time) => field.onChange(time)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="hh:mm aa" // AM/PM format
                timeIntervals={10} // 15-minute intervals
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
          {isLoading && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none z-10">
              <Spinner />
            </div>
          )}
          <Controller
            control={control}
            name="tripEndTime"
            rules={{ required: "Trip End Time is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(time) => field.onChange(time)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="hh:mm aa" // AM/PM format
                timeIntervals={10} // 15-minute intervals
                dateFormat="hh:mm aa" // Format the date to show just time (AM/PM)
                placeholderText="12:00 PM"
                className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
              />
            )}
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

      {/* Custom Image Upload Section */}
      <div className="w-full col-span-2">
        <label
          htmlFor="imageUpload"
          className="block text-sm font-medium text-tColor"
        >
          Trip Receipt
        </label>

        <div className="w-full relative mt-2">
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

          {/* Image Preview with Remove Option */}
          {imagePreview && (
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
