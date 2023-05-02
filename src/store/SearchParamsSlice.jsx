import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  dateTo: "",
  dateFrom: "",
  guestCount: 0,
  wifi: false,
  parking: false,
  breakfast: false,
  pets: false,
};

const searchParamsSlice = createSlice({
  name: "serachParams",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {},
    updateGuestCount: (state, action) => {
      console.log(current(state));
      console.log(action);
      state.guestCount = action.payload.guestCount;
      state.pets = action.payload.pets;
    },
  },
});

console.log(searchParamsSlice);

export const { setSearchParams, updateGuestCount } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
