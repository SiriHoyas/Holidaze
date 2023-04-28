import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venues: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {},
  },
});

export const { addToFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
