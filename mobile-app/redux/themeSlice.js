import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light",
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      AsyncStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      AsyncStorage.setItem("theme", state.mode);
    },
    loadTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
