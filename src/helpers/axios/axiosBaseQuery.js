import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({
    url,
    method,
    data,
    params,
    onDownloadProgress,
    onUploadProgress,
    contentType,
  }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        onDownloadProgress,
        onUploadProgress,
        headers: {
          "Content-Type": contentType || "application/json",
        },
      });
      return result;
    } catch (axiosError) {
      const err = axiosError || {};
      return {
        error: {
          success: false,
          status: err.statusCode || 500,
          data: err || { message: err.statusText || "An error occurred" },
        },
      };
    }
  };
