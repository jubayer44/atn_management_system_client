import { API_URL } from "../../config";
import setAuthToken from "../../utils/setAuthToekn";

// loginUser.js
const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const userData = await res.json();
  if (userData?.data?.accessToken) {
    setAuthToken(userData.data.accessToken);
  }
  return userData;
};

export default loginUser;
