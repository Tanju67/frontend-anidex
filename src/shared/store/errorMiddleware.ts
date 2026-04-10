import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const status = action.payload?.status;
      const message = action.payload?.data?.message || "Something went wrong";
      const endpointName = action.meta?.arg?.endpointName;

      if (status === 0 || status === 429) return next(action);

      const authEndpoints = ["googleLogin", "login", "register"];
      if (authEndpoints.includes(endpointName)) {
        console.log("Authentication Error", message);
        return next(action);
      }

      // 3. KRİTİK HATALAR (500 vb.) veya Anime API hataları
      if (status >= 500 || status === 404) {
        window.location.href = `/error?message=${encodeURIComponent(message)}&status=${status}`;
      }
    }

    return next(action);
  };
