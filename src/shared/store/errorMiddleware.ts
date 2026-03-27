import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: unknown) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as
        | { status?: number; data?: { message?: string } }
        | undefined;

      const message = payload?.data?.message || "Something went wrong";
      const status = payload?.status ?? "Error";

      window.location.href = `/error?message=${encodeURIComponent(
        message,
      )}&status=${status}`;
    }

    return next(action);
  };
