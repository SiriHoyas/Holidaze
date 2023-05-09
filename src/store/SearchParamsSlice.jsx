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
    sendSearchParams: (state, action) => {
      state.keyword = action.payload.keyword;
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
      state.guestCount = action.payload.guestCount;
      state.wifi = action.payload.wifi;
      state.parking = action.payload.parking;
      state.breakfast = action.payload.breakfast;
      state.pets = action.payload.pets;
    },
  },
});

export const { sendSearchParams } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
