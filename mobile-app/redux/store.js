import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warning in dev
    }),
});

export default store; // ✅ Ensure store is exported as default
