import { transformTimeSheetData } from "../../../utils/transformTimeSheetData";
import { baseApi } from "../../api/baseApi";

const timeSheetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeSheets: builder.query({
      query: (args) => ({
        url: "/time-sheet",
        method: "GET",
        params: new URLSearchParams(args),
      }),
      providesTags: ["TimeSheet"],
      transformResponse: (response) => transformTimeSheetData(response),
    }),
    addNewTimeSheet: builder.mutation({
      query: (data) => ({
        url: "/create-time-sheet",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["TimeSheet", "User"],
    }),
    updateTimeSheet: builder.mutation({
      query: ({ id, data }) => ({
        url: `/time-sheet/${id}`,
        method: "PUT",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["TimeSheet", "User"],
    }),
    deleteTimeSheet: builder.mutation({
      query: (id) => ({
        url: `/time-sheet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimeSheet"],
    }),
  }),
});

export const {
  useGetTimeSheetsQuery,
  useAddNewTimeSheetMutation,
  useUpdateTimeSheetMutation,
  useDeleteTimeSheetMutation,
} = timeSheetApi;
