// src/store/bookmarkSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    games: JSON.parse(localStorage.getItem("bookmarks")) || [],
  },
  reducers: {
    addBookmark: (state, action) => {
      if (!state.games.some((game) => game.id === action.payload.id)) {
        state.games.push(action.payload);
        localStorage.setItem("bookmarks", JSON.stringify(state.games));
      }
    },
    removeBookmark: (state, action) => {
      state.games = state.games.filter((game) => game.id !== action.payload);
      localStorage.setItem("bookmarks", JSON.stringify(state.games));
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
