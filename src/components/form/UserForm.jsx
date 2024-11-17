/* eslint-disable react/prop-types */
const UserForm = ({ register, errors, password }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="col-span-2 md:col-span-1 relative">
        <label htmlFor="name" className="block text-xs font-medium text-tColor">
          Name <span className="text-red-500 text-base">*</span>
        </label>

        <input
          type="text"
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
      <div className="col-span-2 md:col-span-1 relative">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-tColor"
        >
          Email <span className="text-red-500 text-base">*</span>
        </label>

        <input
          type="email"
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
      <div className="col-span-2 md:col-span-1 relative">
        <label
          htmlFor="password"
          className="block text-xs font-medium text-tColor"
        >
          Password <span className="text-red-500 text-base">*</span>
        </label>

        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 50,
              message: "Password must not exceed 20 characters",
            },
            // pattern: {
            //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/,
            //   message:
            //     "Password must contain at least one number and one special character",
            // },
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="col-span-2 md:col-span-1 relative">
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-medium text-tColor"
        >
          Confirm Password <span className="text-red-500 text-base">*</span>
        </label>

        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className={`w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500 ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <div className="col-span-2 relative">
        <label htmlFor="role" className="block text-xs font-medium text-tColor">
          Role <span className="text-red-500 text-base">*</span>
        </label>

        <select
          name="role"
          placeholder="Select Role"
          id="role"
          {...register("role", {
            required: "Role is required",
          })}
          className="w-full px-4 py-2 mt-2 text-tColor bg-white border text-sm border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <span className="text-xs text-red-500">{errors.role.message}</span>
        )}
      </div>
    </div>
  );
};

export default UserForm;
