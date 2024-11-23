import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: ({ data, token }) => ({
        url: "/auth/change-password",
        method: "POST",
        contentType: "application/json",
        data,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getMySessions: builder.query({
      query: () => ({
        url: "/auth/my-sessions",
        method: "GET",
      }),
      providesTags: ["Session"],
    }),
    deleteOtherSession: builder.mutation({
      query: (id) => ({
        url: `/auth/delete-session/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetMySessionsQuery,
  useDeleteOtherSessionMutation,
} = authApi;
