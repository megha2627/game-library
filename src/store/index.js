// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmarkSlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});
