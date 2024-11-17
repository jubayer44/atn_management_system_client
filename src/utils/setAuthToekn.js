import Cookies from "js-cookie";
import { authKey } from "./constant";

const setAuthToken = (token) => {
  Cookies.set(authKey, token);
};

export default setAuthToken;
