import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import rosterReducer from "./features/roster/rosterSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    roster: rosterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
