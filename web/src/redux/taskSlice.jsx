import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    loading: false,
    error: null,
    filter: "all",
    searchQuery: "",
    theme: "light",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      toast.success(`New task (${action.payload.title}) Added `);
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
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        toast.success(
          `(${action.payload.updatedTask.title}) has been Updated `
        );
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
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      // localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },
});

export const {
  addTask,
  updateTask,
  setFilter,
  setSearchQuery,
  setLoading,
  setError,
  toggleTheme,
} = taskSlice.actions;
export default taskSlice.reducer;
