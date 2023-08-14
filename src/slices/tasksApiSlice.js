import { apiSlice } from "./apiSlice";

const USERS_URL = "api/v1";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Tasks
    getTasks: builder.query({
      query: () => ({
        url: `${USERS_URL}/alltasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Get All Active Tasks
    getActiveTasks: builder.query({
      query: () => ({
        url: `${USERS_URL}/activetasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Get All Completed Tasks
    getCompletedTasks: builder.query({
      query: () => ({
        url: `${USERS_URL}/completedtasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Add New Task
    addTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/newtask`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Task"],
    }),

    // Update Task
    updateTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `${USERS_URL}/task/${taskId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Task"],
    }),

    // Delete Task
    deleteTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `${USERS_URL}/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

    // Clear Completed Tasks
    deleteCompletedTask: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/clearcompleted`,
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
