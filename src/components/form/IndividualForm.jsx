/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Select from "react-select";

const IndividualForm = ({
  data = null,
  register = null,
  errors = null,
  selectedGender,
  setSelectedGender,
  isSubmit = false,
}) => {
  const genderOptions = ["Men", "Women"].map((gen) => ({
    value: gen,
    label: gen,
  }));

  useEffect(() => {
    // Update selectedGender if data.gender changes
    if (data?.gender) {
      setSelectedGender(data.gender);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="name" className="block text-sm font-medium text-tColor">
          Name <span className="text-red-500 text-base">*</span>
        </label>

        <input
          type="text"
          defaultValue={data?.name}
          placeholder="Name"
          id="name"
          name="name"
          {...register("name", {
            required: "Name is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="col-span-2 md:col-span-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-tColor"
        >
          email <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="email"
          defaultValue={data?.email}
          placeholder="Email"
          id="email"
          name="email"
          {...register("email", {
            required: "Email is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="col-span-2 md:col-span-1">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-tColor"
        >
          Phone <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="tel"
          defaultValue={data?.phone}
          placeholder="Phone"
          id="phone"
          name="phone"
          {...register("phone", {
            required: "Phone Number is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div className="col-span-2 md:col-span-1">
        <div className="flex gap-2 justify-between items-end">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-tColor"
          >
            Gender <span className="text-red-500 text-base">*</span>
          </label>
        </div>

        <Select
          value={genderOptions?.find((gen) => gen?.value === selectedGender)}
          onChange={(option) => setSelectedGender(option?.value || "")}
          options={genderOptions}
          isClearable={true}
          // required={selectedWeekend ? true : false}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor:
                isSubmit && !selectedGender
                  ? "rgb(239 68 68)"
                  : provided.borderColor,
              borderRadius: "8px",
              fontSize: "14px",
              marginTop: "7px",
              "&:hover": {
                border: "1px solid rgb(59 130 246)",
              },
            }),
            menu: (provided) => ({
              ...provided,
              maxHeight: "300px",
              overflowY: "auto",
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "14px",
            }),
          }}
          classNamePrefix="react-select"
        />
        {isSubmit && !selectedGender && (
          <span className="text-xs text-red-500">Gender is required</span>
        )}
      </div>

      <div className="col-span-2 md:col-span-1">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-tColor"
        >
          Address <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          defaultValue={data?.address}
          placeholder="Address"
          id="address"
          name="address"
          {...register("address", {
            required: "Address is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.address ? "border-red-500" : ""
          }`}
        />
        {errors.address && (
          <span className="text-xs text-red-500">{errors.address.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-tColor">
          City <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          defaultValue={data?.city}
          placeholder="City"
          id="city"
          name="city"
          {...register("city", {
            required: "City is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.city ? "border-red-500" : ""
          }`}
        />
        {errors.city && (
          <span className="text-xs text-red-500">{errors.city.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-tColor"
        >
          State <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          defaultValue={data?.state}
          placeholder="State"
          id="state"
          name="state"
          {...register("state", {
            required: "State is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.state ? "border-red-500" : ""
          }`}
        />
        {errors.state && (
          <span className="text-xs text-red-500">{errors.state.message}</span>
        )}
      </div>
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="zip" className="block text-sm font-medium text-tColor">
          zip <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          defaultValue={data?.zip}
          placeholder="Zip"
          id="zip"
          name="zip"
          {...register("zip", {
            required: "Last Name is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.zip ? "border-red-500" : ""
          }`}
        />
        {errors.zip && (
          <span className="text-xs text-red-500">{errors.zip.message}</span>
        )}
      </div>

      <div className="col-span-2">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-tColor"
        >
          Notes
        </label>
        <textarea
          rows={3}
          type="text"
          defaultValue={data?.notes}
          placeholder="Notes"
          id="notes"
          name="notes"
          {...register("notes")}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500`}
        />
        {/* {errors.notes && (
          <span className="text-xs text-red-500">{errors.zip.message}</span>
        )} */}
      </div>
    </div>
  );
};

export default IndividualForm;
