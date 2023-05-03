import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  dateFrom: "",
  dateTo: "",
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
    updateKeyword: (state, action) => {
      state.keyword = action.payload.keyword;
    },
    updateDateFrom: (state, action) => {
      console.log(current(state));
      state.dateFrom = action.payload.dateFrom;
    },
    updateDateTo: (state, action) => {
      console.log(current(state));
      state.dateTo = action.payload.dateTo;
    },
    updateGuestCount: (state, action) => {
      console.log(current(state));
      state.guestCount = action.payload.guestCount;
      state.pets = action.payload.pets;
    },
    updateWifi: (state, action) => {
      state.wifi = action.payload.wifi;
    },
    updateParking: (state, action) => {
      state.parking = action.payload.parking;
    },
    updateBreakfast: (state, action) => {
      state.breakfast = action.payload.breakfast;
    },
    updatePets: (state, action) => {
      state.pets = action.payload.pets;
    },
  },
});

console.log(searchParamsSlice);

export const { updateGuestCount, updateDateFrom, updateDateTo } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
