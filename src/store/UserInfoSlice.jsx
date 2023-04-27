import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  avatar: "",
  venueManager: false,
  accessToken: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
});

export default userInfoSlice.reducer;
