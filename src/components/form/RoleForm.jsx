/* eslint-disable react/prop-types */
const RoleForm = ({ register, errors, roleData = {} }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-tColor">
          Role <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          defaultValue={roleData?.name}
          placeholder="Table Leader"
          id="name"
          name="name"
          {...register("name", {
            required: "Role is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="layDirector"
          className="block text-sm font-medium text-tColor"
        >
          Abbreviation <span className="text-red-500 text-base">*</span>
        </label>
        <input
          type="text"
          placeholder="TL"
          defaultValue={roleData?.abbreviation}
          id="abbreviation"
          name="abbreviation"
          {...register("abbreviation", {
            required: "Abbreviation is required",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.abbreviation ? "border-red-500" : ""
          }`}
        />
        {errors.abbreviation && (
          <span className="text-xs text-red-500">
            {errors.abbreviation.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default RoleForm;
