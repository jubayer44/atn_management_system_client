import { baseApi } from "../../api/baseApi";

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (args) => ({
        url: "/role",
        method: "GET",
        params: new URLSearchParams(args),
      }),
      providesTags: ["Role"],
    }),
    getSingleRole: builder.query({
      query: (id) => ({
        url: `/role/${id}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: "/role",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/role/${id}`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role", "Roster"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetSingleRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
