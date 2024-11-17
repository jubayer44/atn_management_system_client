import {
  transformSingleWeekendData,
  transformWeekendsData,
} from "../../../utils/transformWeekendData";
import { baseApi } from "../../api/baseApi";

const weekendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeekends: builder.query({
      query: (args) => ({
        url: "/weekend",
        method: "GET",
        params: new URLSearchParams(args),
      }),
      providesTags: ["Weekend"],
      transformResponse: (response) => transformWeekendsData(response),
    }),
    getSingleWeekend: builder.query({
      query: (id) => ({
        url: `/weekend/${id}`,
        method: "GET",
      }),
      providesTags: ["Weekend"],
      transformResponse: (response) => transformSingleWeekendData(response),
    }),
    createWeekend: builder.mutation({
      query: (data) => ({
        url: "/weekend",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Weekend"],
    }),
    updateWeekend: builder.mutation({
      query: ({ id, data }) => ({
        url: `/weekend/${id}`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Weekend"],
    }),
    deleteWeekend: builder.mutation({
      query: (id) => ({
        url: `/weekend/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Weekend", "Roster"],
    }),
  }),
});

export const {
  useGetWeekendsQuery,
  useGetSingleWeekendQuery,
  useCreateWeekendMutation,
  useUpdateWeekendMutation,
  useDeleteWeekendMutation,
} = weekendApi;
