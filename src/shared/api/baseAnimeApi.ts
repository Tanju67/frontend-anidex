import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axiosBaseQuery";
import { animeAxiosInstance } from "../utils/animeAxioasInstance";

const baseQuery = axiosBaseQuery(animeAxiosInstance);

const staggeredBaseQuery = retry(baseQuery, {
  maxRetries: 3, // Hız limitine takılırsa 3 kez daha deneyecek
});

export const baseAnimeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["Anime"],
  endpoints: () => ({}),
});
