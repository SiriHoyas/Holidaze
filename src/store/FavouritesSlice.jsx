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
    removeFromFavourites: (state, action) => {
      state.venues = state.venues.filter((venue) => {
        return venue.id !== action.payload;
      });
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
