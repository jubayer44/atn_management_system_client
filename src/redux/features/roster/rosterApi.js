import {
  transformManageRoster,
  transformRosterData,
  transformSingleRoster,
} from "../../../utils/transformRosterData";
import { baseApi } from "../../api/baseApi";

const rosterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManageRoster: builder.query({
      query: (args) => ({
        url: "/roster",
        method: "GET",
        params: new URLSearchParams(args),
      }),
      providesTags: ["Roster"],
      transformResponse: (response) => transformManageRoster(response),
    }),
    getSingleRoster: builder.query({
      query: (id) => ({
        url: `/roster/${id}`,
        method: "GET",
      }),
      providesTags: ["Roster"],
      transformResponse: (response) => transformSingleRoster(response),
    }),
    getViewRoster: builder.query({
      query: (args) => ({
        url: "/roster",
        method: "GET",
        params: new URLSearchParams(args),
      }),
      providesTags: ["Roster"],
      transformResponse: (response) => transformRosterData(response),
    }),
    createRoster: builder.mutation({
      query: (data) => ({
        url: "/roster",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Roster"],
    }),
    updateRoster: builder.mutation({
      query: ({ id, data }) => ({
        url: `/roster/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Roster"],
    }),
    importRoster: builder.mutation({
      query: (data) => ({
        url: "/import-roster",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Roster", "Weekend", "Individual", "Role"],
    }),
    deleteRoster: builder.mutation({
      query: (id) => ({
        url: `/roster/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roster"],
    }),
  }),
});

export const {
  useGetManageRosterQuery,
  useGetSingleRosterQuery,
  useGetViewRosterQuery,
  useCreateRosterMutation,
  useUpdateRosterMutation,
  useImportRosterMutation,
  useDeleteRosterMutation,
} = rosterApi;
