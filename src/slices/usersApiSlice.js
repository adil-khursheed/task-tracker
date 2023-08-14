import { apiSlice } from "./apiSlice";

// const USERS_URL = "/api/v1";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: `/verify`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/forgotpassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/resetpassword`,
        method: "PUT",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/updateprofile`,
        method: "PUT",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/updatepassword`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = usersApiSlice;
