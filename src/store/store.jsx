import { configureStore } from "@reduxjs/toolkit";

import FavouritesReducer from "./FavouritesSlice";
import searchParamsReducer from "./SearchParamsSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchParams: searchParamsReducer,
    favourites: FavouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["serachParams/sendSearchParams"],
        ignoredPaths: ["searchParams.dateFrom", "searchParams.dateTo"],
      },
    }),
});

console.log(store.getState());
