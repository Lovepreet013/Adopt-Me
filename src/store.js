import { configureStore } from "@reduxjs/toolkit";
import adoptedPetSlice from "./adoptedPetSlice";
import searchParamsSlice from "./searchParamsSlice";
import { petApi } from "./petApiService";

const store = configureStore({
  reducer: {
    adoptedPetSlice,
    searchParamsSlice,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware),
});

export default store;
