/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";

const RosterForm = ({
  isSubmit,
  isLoadingIndividuals = false,
  isLoadingRoles = false,
  isLoadingWeekends = false,
  individualsOptions = [],
  roleOptions = [],
  weekendOptions = [],
  selectedIndividual,
  setSelectedIndividual,
  selectedRole,
  setSelectedRole,
  selectedWeekend,
  setSelectedWeekend,
  email,
  setSearchValue,
  setSearchTerm,
  isFetchingIndividual,
  data = {},
}) => {
  const [value, setValue] = useState("");
  const pathName = useLocation()?.pathname;
  const addRosterPath = pathName.includes("add-roster");

  useEffect(() => {
    if (data?.id) {
      setSelectedRole(data?.roleId);
      setSelectedWeekend(data?.weekendId);
    }
  }, [data]);

  const handleInputChange = (inputValue) => {
    setSearchValue(inputValue);
  };
  const handleChange = (option) => {
    setSelectedIndividual(option);
  };

  const isClean = () => {
    setSelectedIndividual(null);
    setSearchTerm(null);
  };

  useEffect(() => {
    if (selectedIndividual) {
      setValue(
        individualsOptions?.find(
          (individual) => individual?.value === selectedIndividual.value
        )
      );
    } else {
      setValue("");
    }
  }, [selectedIndividual]);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className={`col-span-2 ${addRosterPath ? "block" : "hidden"}`}>
        <div className="col-span-2">
          <div className={`flex gap-2 justify-between items-end`}>
            <label
              htmlFor="individual"
              className="block text-sm font-medium text-tColor"
            >
              Select a Individual
              <span className="text-red-500 text-base">*</span>
            </label>
            <Link to="/create-individual" className="text-xs text-blue-500">
              Create a Individual
            </Link>
          </div>

          <div className="relative">
            <span
              className="absolute right-[46px] top-[9px] text-xs opacity-0 z-40 cursor-pointer p-2 border-2 h-2 w-2 border-black"
              onClick={isClean}
            ></span>
            <Select
              value={value}
              onChange={handleChange}
              options={individualsOptions || []}
              placeholder="Select an Individual"
              onInputChange={handleInputChange}
              isLoading={isFetchingIndividual || isLoadingIndividuals}
              isSearchable={true}
              isClearable={isClean}
              // ref={inputRef}
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor:
                    isSubmit && !selectedIndividual
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
          </div>

          {isSubmit && !selectedIndividual && (
            <span className="text-xs text-red-500">Individual is required</span>
          )}
        </div>

        <div
          className={`col-span-2 mt-4 ${email && value ? "block" : "hidden"}`}
        >
          <div className="flex gap-2 justify-between items-end">
            <label className="block text-sm font-medium text-tColor">
              Email
            </label>
          </div>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className={`col-span-2 ${addRosterPath ? "hidden" : "block"}`}>
        <div className={`col-span-2 mb-4`}>
          <div className="flex gap-2 justify-between items-end">
            <label className="block text-sm font-medium text-tColor">
              Individual
            </label>
          </div>
          <input
            type="text"
            value={data?.name}
            readOnly
            className="w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className={`col-span-2`}>
          <div className="flex gap-2 justify-between items-end">
            <label className="block text-sm font-medium text-tColor">
              Individual Email
            </label>
          </div>
          <input
            type="email"
            value={data?.email}
            readOnly
            className="w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className="col-span-2">
        <div className="flex gap-2 justify-between items-end">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-tColor"
          >
            Select a Role{" "}
            <span
              className={`text-red-500 text-base ${
                addRosterPath ? "inline-block" : "hidden"
              }`}
            >
              *
            </span>
          </label>
          <Link to="/create-role" className="text-xs text-blue-500">
            Create a Role
          </Link>
        </div>

        <Select
          value={roleOptions.find((role) => role.value === selectedRole)}
          onChange={(option) => setSelectedRole(option?.value || "")}
          options={roleOptions}
          isClearable={addRosterPath ? true : false}
          placeholder="Select a Role"
          isLoading={isLoadingRoles}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor:
                isSubmit && !selectedRole
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

        {isSubmit && !selectedRole && (
          <span className="text-xs text-red-500">Role is required</span>
        )}
      </div>

      <div className="col-span-2">
        <div className="flex gap-2 justify-between items-end">
          <label
            htmlFor="weekend"
            className="block text-sm font-medium text-tColor"
          >
            Select a Weekend{" "}
            <span
              className={`text-red-500 text-base ${
                addRosterPath ? "inline-block" : "hidden"
              }`}
            >
              *
            </span>
          </label>
          <Link to="/create-weekend" className="text-xs text-blue-500">
            Create a Weekend
          </Link>
        </div>
        <div className="relative">
          <Select
            value={weekendOptions?.find(
              (item) => item.value === selectedWeekend
            )}
            onChange={(option) => setSelectedWeekend(option?.value || "")}
            options={weekendOptions}
            isClearable={addRosterPath ? true : false}
            placeholder="Select a Weekend"
            isLoading={isLoadingWeekends}
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor:
                  isSubmit && !selectedWeekend
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
        </div>
        {isSubmit && !selectedWeekend && (
          <span className="text-xs text-red-500">Weekend is required</span>
        )}
      </div>
    </div>
  );
};

export default RosterForm;
