import { configureStore } from "@reduxjs/toolkit";
import searchParamsReducer from "./SearchParamsSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchParams: searchParamsReducer,
  },
});
