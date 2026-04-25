import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";

/**
 * Global RTK Query Error Logger Middleware
 * * This middleware intercepts all rejected API actions and handles error
 * redirection or logging based on HTTP status codes and endpoint names.
 */

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: any) => {
    // Check if the action is an RTK Query rejection
    if (isRejectedWithValue(action)) {
      const status = action.payload?.status;
      const message =
        action.payload?.data?.message || "An unexpected error occurred";
      const endpointName = action.meta?.arg?.endpointName;

      /**
       * 1. RATE LIMITING & NETWORK ERRORS
       * Status 0: Network error (usually CORS or no connection)
       * Status 429: Too Many Requests (Rate limit reached)
       * We let these pass through to be handled by local component logic (like showing a toast).
       */
      if (status === 0 || status === 429) return next(action);

      /**
       * 2. AUTHENTICATION ERRORS
       * We avoid redirecting for login/register/google-auth errors so that
       * the user can see validation messages on the toaster.
       */
      const authEndpoints = ["googleLogin", "login", "register"];
      if (authEndpoints.includes(endpointName)) {
        console.log("Authentication Error", message);
        return next(action);
      }

      const animeEndpoints = ["getRecentPromos"];
      if (animeEndpoints.includes(endpointName)) {
        console.log("Anime Error", message);
        return next(action);
      }

      /**
       * 3. CRITICAL ERRORS & TIMEOUTS
       * Status 500-504: Internal Server Error or Gateway Timeouts
       * Status 404: Resource Not Found
       * Redirects user to a dedicated error page for a better UX.
       */
      if (status >= 500 || status === 404) {
        window.location.href = `/error?message=${encodeURIComponent(message)}&status=${status}`;
      }
    }

    return next(action);
  };
