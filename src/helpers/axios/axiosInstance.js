import axios from "axios";
import { getNewAccessToken } from "../../services/authServices";
import { authKey } from "../../utils/constant";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/local-storage";
import setAuthToken from "../../utils/setAuthToekn";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60 * 1000; // 1 minute in milliseconds

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject = {
      data: response?.data,
    };
    return responseObject;
  },
  async function (error) {
    const config = error.config;
    if (
      error?.response?.data?.message?.includes("Token has expired") &&
      !config.sent
    ) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.data?.accessToken || null;
      if (accessToken) {
        config.headers["Authorization"] = accessToken;
        setToLocalStorage(authKey, accessToken);
        setAuthToken(accessToken);
      }
      return instance(config);
    } else if (
      error?.response?.data?.message?.includes("Zod Validation Error")
    ) {
      // const message =
      //   error?.response?.data?.error?.map((item) => item.message).join(", ") ||
      //   "Validation error";
      const message = error?.response?.data?.error;

      const responseObject = {
        success: false,
        statusCode: error?.response?.status || 500,
        message,
        errorMessage: error?.response?.data?.message,
      };

      // return responseObject;
      return Promise.reject(responseObject);
    } else if (error?.response?.data?.error?.statusCode === 409) {
      const responseObject = {
        success: false,
        statusCode: error?.response?.data?.error?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessage: error?.response?.data?.message,
      };

      return Promise.reject(responseObject);
    } else {
      const responseObject = {
        success: false,
        statusCode: error?.response?.data?.errorDetails?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessage: error?.response?.data?.message,
      };

      return Promise.reject(responseObject);

      // return responseObject;
    }
  }
);

export { instance };
