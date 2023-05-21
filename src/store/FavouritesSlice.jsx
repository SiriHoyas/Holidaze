import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venues: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.venues = [...state.venues, action.payload];
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     */
    removeFromFavourites: (state, action) => {
      state.venues = state.venues.filter((venue) => {
        return venue !== action.payload;
      });
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
