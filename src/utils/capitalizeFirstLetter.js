export const capitalizeFirstLetter = (role) => {
  if (!role) return role;
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};
