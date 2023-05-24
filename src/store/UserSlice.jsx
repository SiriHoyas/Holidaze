import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  email: null,
  avatar: null,
  venueManager: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.venueManager = action.payload.venueManager;
    },
    setProfileMedia: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setUserInfo, setProfileMedia } = userSlice.actions;

export default userSlice.reducer;
