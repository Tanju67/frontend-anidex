// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./authApi";
import { baseAnimeApi } from "../api/baseAnimeApi";
import { rtkQueryErrorLogger } from "./errorMiddleware";
import { backendApi } from "../api/backendApi";

export const store = configureStore({
  reducer: {
    // [authApi.reducerPath]: authApi.reducer,
    [baseAnimeApi.reducerPath]: baseAnimeApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(authApi.middleware)
      .concat(baseAnimeApi.middleware)
      .concat(backendApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
