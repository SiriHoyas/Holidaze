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
  },
});

export const { addToFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
