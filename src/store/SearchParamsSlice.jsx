import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setSearchParams } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
