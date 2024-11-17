import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: (args) => ({
        url: "/user/all-users",
        method: "GET",
        params: new URLSearchParams(args),
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/single-user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getMyProfile: builder.query({
      query: (args) => ({
        url: `/user/my-profile?sessionId=${args?.sessionId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-user/${id}`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserName: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/${id}`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    deleteMultipleUsers: builder.mutation({
      query: (data) => ({
        url: "/user/delete-multiple",
        method: "DELETE",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetMyProfileQuery,
  useUpdateUserMutation,
  useUpdateUserNameMutation,
  useDeleteUserMutation,
  useDeleteMultipleUsersMutation,
} = userApi;
