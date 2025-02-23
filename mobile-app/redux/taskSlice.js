import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    filter: "all",
    searchQuery: "",
    theme: "light",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.updatedTask,
        };
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  setTasks,
  updateTask,
  setFilter,
  setSearchQuery,
  setLoading,
  setError,
} = taskSlice.actions;
export default taskSlice.reducer;
