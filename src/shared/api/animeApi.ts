import {
  type AnimeImageType,
  type AnimeType,
  type BannerSliderType,
  type CharactersType,
  type EpisodesResponseType,
  type ReviewsResponseType,
  type RowSliderType,
  type SliderItemType,
} from "../schemas/animeSchema";
import { baseAnimeApi } from "./baseAnimeApi";

export const animeApi = baseAnimeApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopAnime: builder.query<
      RowSliderType,
      { page: number; limit: number; type: AnimeType }
    >({
      query: ({ page, limit, type }) => ({
        url: `/top/anime?page=${page}&limit=${limit}&type=${type}`,
        method: "GET",
      }),
      transformResponse: (response: { data: RowSliderType }) => {
        return response.data;
      },
    }),

    getUpcomingAnime: builder.query<
      BannerSliderType,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/seasons/upcoming?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: { data: BannerSliderType }) => {
        return response.data;
      },
    }),

    getRandomAnime: builder.query<SliderItemType, void>({
      query: () => ({
        url: `/random/anime`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    getAnimeByGenre: builder.query<
      RowSliderType,
      { page: number; limit: number; genre: number }
    >({
      query: ({ page, limit, genre }) => ({
        url: `/anime?genres=${genre}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: { data: RowSliderType }) => {
        return response.data;
      },
    }),

    getCurrentSeason: builder.query<
      BannerSliderType,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/seasons/now?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: { data: BannerSliderType }) => {
        return response.data;
      },
    }),

    getAnimeById: builder.query<SliderItemType, string>({
      query: (id) => ({
        url: `/anime/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    getCharactersByAnimeId: builder.query<CharactersType, string>({
      query: (id) => ({
        url: `/anime/${id}/characters`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    getAnimePictureById: builder.query<AnimeImageType, string>({
      query: (id) => ({
        url: `/anime/${id}/pictures`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    getAnimeReviewsById: builder.query<
      ReviewsResponseType,
      { id: string; page: number }
    >({
      query: ({ id, page }) => ({
        url: `/anime/${id}/reviews?page=${page}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    getAnimeEpisodesById: builder.query<
      EpisodesResponseType,
      { id: string; page: number }
    >({
      query: ({ id, page }) => ({
        url: `/anime/${id}/episodes/${page}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetTopAnimeQuery,
  useGetUpcomingAnimeQuery,
  useGetRandomAnimeQuery,
  useGetAnimeByGenreQuery,
  useGetCurrentSeasonQuery,
  useGetAnimeByIdQuery,
  useGetCharactersByAnimeIdQuery,
  useGetAnimePictureByIdQuery,
  useGetAnimeReviewsByIdQuery,
  useGetAnimeEpisodesByIdQuery,
} = animeApi;
