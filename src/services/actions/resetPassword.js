import { API_URL } from "../../config";

const resetPassword = async ({ data, token }) => {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};

export default resetPassword;
