/* eslint-disable react/prop-types */
import { addDays, parse } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import Spinner from "../loading/Spinner";

const WeekendForm = ({
  weekendData = {},
  register,
  errors,
  control,
  Controller,
}) => {
  const [dateBegin, setDateBegin] = useState(
    weekendData?.dateBegin
      ? parse(weekendData.dateBegin, "dd-MM-yyyy", new Date())
      : null
  );

  // const { data: dates, isLoading } = useGetWeekendsQuery({ limit });
  const isLoading = false;
  const datesEmpty = [];
  let existingRanges = [];
  if (datesEmpty?.data) {
    existingRanges = datesEmpty?.data
      .map((range) => {
        if (range.dateBegin && range.dateEnd) {
          return {
            dateBegin: range.dateBegin,
            dateEnd: range.dateEnd,
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  const isDateInRange = (date, range) => {
    const startDate = parse(range.dateBegin, "dd-MM-yyyy", new Date());
    const endDate = parse(range.dateEnd, "dd-MM-yyyy", new Date());

    return (
      startDate instanceof Date &&
      endDate instanceof Date &&
      date >= startDate &&
      date <= endDate
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label
          htmlFor="weekendNo"
          className="block text-sm font-medium text-tColor"
        >
          Weekend No <span className="text-red-500 text-base">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            defaultValue={weekendData?.weekendNo}
            placeholder="20"
            id="weekendNo"
            name="weekendNo"
            style={{ paddingLeft: "75px" }}
            {...register("weekendNo", {
              required: "Weekend No is required",
              validate: (value) => {
                return (
                  (value > 0 && value <= 99) ||
                  "Weekend No must be between 1 and 99"
                );
              },
            })}
            className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
              errors.weekendNo ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="weekendNo"
            className="text-xs text-tColor absolute top-5 left-4"
          >
            Weekend
          </label>
        </div>
        {errors.weekendNo && (
          <span className="text-xs text-red-500">
            {errors.weekendNo.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="layDirector"
          className="block text-sm font-medium text-tColor"
        >
          Lay Director <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          placeholder="Lay Director"
          defaultValue={weekendData?.layDirector}
          id="layDirector"
          name="layDirector"
          {...register("layDirector", {
            required: "Lay Director is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.layDirector ? "border-red-500" : ""
          }`}
        />
        {errors.layDirector && (
          <span className="text-xs text-red-500">
            {errors.layDirector.message}
          </span>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="dateBegin"
          className="block text-sm font-medium text-tColor"
        >
          Date Begin <span className="text-red-500 text-base">*</span>
        </label>

        <div className="w-full relative mt-2 flex items-center">
          {isLoading && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none z-10">
              <Spinner />
            </div>
          )}
          <Controller
            control={control}
            defaultValue={
              weekendData?.dateBegin &&
              parse(weekendData?.dateBegin, "dd-MM-yyyy", new Date())
            }
            name="dateBegin"
            rules={{ required: "Date Begin is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="dd-mm-yyyy"
                onChange={(date) => {
                  field.onChange(date);
                  setDateBegin(date);
                }}
                selected={field.value}
                defaultValue={weekendData?.dateBegin}
                dateFormat="dd-MM-yyyy"
                disabled={isLoading}
                filterDate={(date) => {
                  // Allow all dates if existingRanges is empty
                  if (existingRanges?.length === 0) return true;

                  // Disable dates in existing ranges
                  return !existingRanges?.some((range) =>
                    isDateInRange(date, range)
                  );
                }}
                className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                  errors.dateBegin ? "border-red-500" : ""
                }`}
              />
            )}
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <AiOutlineCalendar className="text-gray-400" />
          </div>
        </div>

        {errors.dateBegin && (
          <span className="text-xs text-red-500">
            {errors.dateBegin.message}
          </span>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="dateEnd"
          className="block text-sm font-medium text-tColor"
        >
          Date End <span className="text-red-500 text-base">*</span>
        </label>

        <div className="w-full relative mt-2 flex items-center">
          {isLoading && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none z-10">
              <Spinner />
            </div>
          )}
          <Controller
            control={control}
            defaultValue={
              weekendData?.dateEnd &&
              parse(weekendData?.dateEnd, "dd-MM-yyyy", new Date())
            }
            name="dateEnd"
            rules={{ required: "Date End is required" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="dd-mm-yyyy"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                defaultValue={weekendData?.dateEnd}
                dateFormat="dd-MM-yyyy"
                disabled={isLoading}
                filterDate={(date) => {
                  // Allow all dates if existingRanges is empty
                  if (existingRanges.length === 0)
                    return date >= addDays(dateBegin, 1);

                  // Disable dates in existing ranges and ensure end date is after start date
                  return (
                    (!dateBegin || date >= addDays(dateBegin, 1)) &&
                    !existingRanges.some((range) => isDateInRange(date, range))
                  );
                }}
                startDate={dateBegin}
                openToDate={dateBegin}
                className={`w-full px-4 py-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
                  errors.dateEnd ? "border-red-500" : ""
                }`}
              />
            )}
          />

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <AiOutlineCalendar className="text-gray-400" />
          </div>
        </div>

        {errors.dateEnd && (
          <span className="text-xs text-red-500">{errors.dateEnd.message}</span>
        )}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-tColor"
        >
          Description
        </label>
        <textarea
          cols={3}
          placeholder="Description"
          defaultValue={weekendData?.description}
          id="description"
          name="description"
          {...register("description")}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default WeekendForm;
