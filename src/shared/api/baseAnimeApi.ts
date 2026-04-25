import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axiosBaseQuery";
import { animeAxiosInstance } from "../utils/animeAxioasInstance";

/**
 * Custom Base Query using Axios
 * * Integrates an Axios instance with RTK Query to leverage Axios features
 * such as interceptors and custom configuration.
 */
const baseQuery = axiosBaseQuery(animeAxiosInstance);

/**
 * Staggered Base Query with Retry Logic
 * * Specifically designed to handle Rate Limiting (HTTP 429) from public APIs like Jikan.
 * If a request fails, it will automatically retry up to 3 times with a staggered backoff.
 */
const staggeredBaseQuery = retry(baseQuery, {
  maxRetries: 3,
});

/**
 * Base Anime API Definition
 * * This is the core API slice for Jikan API interactions.
 * Endpoints are injected from separate feature files to maintain a modular
 * and scalable code structure.
 */
export const baseAnimeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["Anime"],
  /**
   * Endpoints are defined in separate 'slice' files using .injectEndpoints()
   * to keep this file clean and organized.
   */
  endpoints: () => ({}),
});
