import { apiSlice } from "./apiSlice";

const USERS_URL = "api/v1";

const boundary = "---------------------------" + Date.now().toString(16);

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        mode: "no-cors",
        method: "POST",
        body: data,
        headers: {
          "content-type": `multipart/form-data; boundary=${boundary}`,
        },
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
    }),

    verify: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify`,
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotpassword`,
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetpassword`,
        method: "PUT",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateprofile`,
        method: "PUT",
        body: data,
        headers: {
          "content-type": "multipart/form-data",
        },
        credentials: "include",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatepassword`,
        method: "PUT",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
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
