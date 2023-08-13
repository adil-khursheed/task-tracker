import { apiSlice } from "./apiSlice";

// const USERS_URL = "";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Tasks
    getTasks: builder.query({
      query: () => ({
        url: `/alltasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Get All Active Tasks
    getActiveTasks: builder.query({
      query: () => ({
        url: `/activetasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Get All Completed Tasks
    getCompletedTasks: builder.query({
      query: () => ({
        url: `/completedtasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Add New Task
    addTask: builder.mutation({
      query: (data) => ({
        url: `/newtask`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }),
      invalidatesTags: ["Task"],
    }),

    // Update Task
    updateTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `/task/${taskId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Task"],
    }),

    // Delete Task
    deleteTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // Clear Completed Tasks
    deleteCompletedTask: builder.mutation({
      query: () => ({
        url: `/clearcompleted`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTasksQuery,
  useGetActiveTasksQuery,
  useGetCompletedTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useDeleteCompletedTaskMutation,
} = tasksApiSlice;
