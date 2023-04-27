import userInfoReducer from "./UserInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
