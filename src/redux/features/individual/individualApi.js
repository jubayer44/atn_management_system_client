import { baseApi } from "../../api/baseApi";

const individualApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndividuals: builder.query({
      query: (args) => {
        return {
          url: "/individual",
          method: "GET",
          params: new URLSearchParams(args),
        };
      },
      transformResponse: (response) => {
        return {
          success: response?.success,
          statusCode: response?.statusCode,
          message: response?.message,
          meta: response?.meta,
          data: response?.data.map((item) => {
            return {
              id: item?.id || "",
              name: item?.name || "",
              email: item?.email || "",
              phone: item?.phone || "",
              gender: item?.gender || "",
              address: item?.address || "",
              city: item?.city || "",
              state: item?.state || "",
              zip: item?.zip || "",
              notes: item?.notes || "",
            };
          }),
        };
      },
      providesTags: ["Individual"],
    }),
    getSingleIndividual: builder.query({
      query: (id) => {
        return {
          url: `/individual/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Individual"],
    }),
    getFreshIndividuals: builder.query({
      query: (args) => {
        return {
          url: "/fresh-individual",
          method: "GET",
          params: new URLSearchParams(args),
        };
      },
      providesTags: ["Individual"],
    }),
    createIndividual: builder.mutation({
      query: (data) => {
        return {
          url: "/individual",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: ["Individual"],
    }),
    updateIndividual: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/individual/${id}`,
          method: "PUT",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: ["Individual"],
    }),
    deleteIndividual: builder.mutation({
      query: (id) => {
        return {
          url: `/individual/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Individual", "Roster"],
    }),
  }),
});

export const {
  useGetIndividualsQuery,
  useGetSingleIndividualQuery,
  useGetFreshIndividualsQuery,
  useCreateIndividualMutation,
  useUpdateIndividualMutation,
  useDeleteIndividualMutation,
} = individualApi;
