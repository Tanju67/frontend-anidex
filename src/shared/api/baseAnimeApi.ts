import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axiosBaseQuery";
import { animeAxiosInstance } from "../utils/animeAxioasInstance";

export const baseAnimeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: axiosBaseQuery(animeAxiosInstance),
  tagTypes: ["Anime"],
  endpoints: () => ({}),
});
