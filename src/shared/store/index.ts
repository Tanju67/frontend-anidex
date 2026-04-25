import { configureStore } from "@reduxjs/toolkit";
import { baseAnimeApi } from "../api/baseAnimeApi";
import { backendApi } from "../api/backendApi";
import { rtkQueryErrorLogger } from "./errorMiddleware";

/**
 * Redux Store Configuration
 * * This store centralizes the application state, specifically managing
 * API caching and state synchronization for both the Jikan API (baseAnimeApi)
 * and our custom Backend API (backendApi).
 */
export const store = configureStore({
  reducer: {
    // API Reducers: Dynamically set using the reducerPath defined in each API slice
    [baseAnimeApi.reducerPath]: baseAnimeApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  /**
   * Middleware Configuration
   * * Includes default middleware (thunk, serializableCheck, etc.)
   * and appends API middlewares for caching, invalidation, and polling.
   * Also integrates a custom global error logger for centralized error handling.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseAnimeApi.middleware)
      .concat(backendApi.middleware)
      .concat(rtkQueryErrorLogger),
});

/**
 * RootState Type
 * Represents the complete state tree of the Redux store.
 * Useful for typed selectors throughout the application.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch Type
 * Provides a typed dispatch function to ensure actions dispatched
 * conform to the defined store logic.
 */
export type AppDispatch = typeof store.dispatch;
