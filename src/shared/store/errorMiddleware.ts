import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const status = action.payload?.status;
      const message = action.payload?.data?.message || "Something went wrong";

      // 1. İptal edilen istekleri (status 0) görmezden gel
      // 2. Hız limiti hatalarını (status 429) görmezden gel (sayfa değişmesin)
      if (status === 0 || status === 429) {
        console.warn("Hata görmezden gelindi (Abort veya 429):", message);
        return next(action);
      }

      // Sadece 500, 404 veya 400 gibi "gerçek" hatalarda yönlendir
      window.location.href = `/error?message=${encodeURIComponent(message)}&status=${status}`;
    }

    return next(action);
  };
