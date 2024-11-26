import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";
import { API_URL } from "../../config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }),

  tagTypes: ["TimeSheet", "User", "Session"],

  endpoints: () => ({}),
});
