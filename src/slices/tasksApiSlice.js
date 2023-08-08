import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/v1";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `${USERS_URL}/newtask`,
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/newtask`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useAddTaskMutation } = tasksApiSlice;
