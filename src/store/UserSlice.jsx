import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  avatar: "",
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
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;

//UPDATE USER INFO

// const dispatch = useDispatch();
// const { userName } = useSelector((store) => store.user);
// console.log(userName);

// function updateUserInfo() {
//   const user = {
//     userName: "Siri",
//     email: "siri@skjervold.me",
//     avatar: "bilde",
//     venueManage: true,
//   };
//   dispatch(setUserInfo(user));
//   console.log(userName);
// }
