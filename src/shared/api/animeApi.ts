import {
  type AllNewsType,
  type AnimeImageType,
  type AnimeType,
  type BannerSliderType,
  type CharactersType,
  type EpisodesResponseType,
  type PersonType,
  type RecommendationsType,
  type ReviewsResponseType,
  type RowSliderResponse,
  type RowSliderType,
  type SingleEpisodeType,
  type SliderItemType,
  type VoiceActorDetailType,
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
      keepUnusedDataFor: 60,
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
      keepUnusedDataFor: 60,
    }),

    getRandomAnime: builder.query<SliderItemType, void>({
      query: () => ({
        url: `/random/anime`,
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log(response);
        return response.data;
      },
      keepUnusedDataFor: 60,
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
      keepUnusedDataFor: 60,
    }),

    getCurrentSeason: builder.query<
      RowSliderResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/seasons/now?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log(response);
        return response;
      },
      keepUnusedDataFor: 60,
    }),

    getAnimeById: builder.query<SliderItemType, string>({
      query: (id) => ({
        url: `/anime/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getCharactersByAnimeId: builder.query<CharactersType, string>({
      query: (id) => ({
        url: `/anime/${id}/characters`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getAnimePictureById: builder.query<AnimeImageType, string>({
      query: (id) => ({
        url: `/anime/${id}/pictures`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
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
      keepUnusedDataFor: 60,
    }),

    getAnimeEpisodesById: builder.query<
      EpisodesResponseType,
      { id: string; page?: number }
    >({
      query: ({ id, page }) => ({
        url: `/anime/${id}/episodes?page=${page}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      keepUnusedDataFor: 60,
    }),

    getEpisodeByEpisodeId: builder.query<
      SingleEpisodeType,
      { id: string; episode: number }
    >({
      query: ({ id, episode }) => ({
        url: `/anime/${id}/episodes/${episode}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getSimilarAnimesById: builder.query<RecommendationsType, string>({
      query: (id) => ({
        url: `/anime/${id}/recommendations`,
        method: "GET",
      }),
      transformResponse: (response: { data: RecommendationsType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getAnimeNewsById: builder.query<AllNewsType, string>({
      query: (id) => ({
        url: `/anime/${id}/news`,
        method: "GET",
      }),
      transformResponse: (response: { data: AllNewsType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getSingleCharacterById: builder.query<PersonType, string>({
      query: (id) => ({
        url: `/characters/${id}/full`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getPeopleFullById: builder.query<VoiceActorDetailType, string>({
      query: (id) => ({
        url: `/people/${id}/full`,
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log(response);
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetTopAnimeQuery,
  useGetUpcomingAnimeQuery,
  useGetRandomAnimeQuery,
  useGetAnimeByGenreQuery,
  useGetCurrentSeasonQuery,
  useLazyGetCurrentSeasonQuery,
  useGetAnimeByIdQuery,
  useGetCharactersByAnimeIdQuery,
  useGetAnimePictureByIdQuery,
  useGetAnimeReviewsByIdQuery,
  useLazyGetAnimeReviewsByIdQuery,
  useGetAnimeEpisodesByIdQuery,
  useLazyGetAnimeEpisodesByIdQuery,
  useLazyGetEpisodeByEpisodeIdQuery,
  useGetSimilarAnimesByIdQuery,
  useGetAnimeNewsByIdQuery,
  useGetSingleCharacterByIdQuery,
  useGetPeopleFullByIdQuery,
} = animeApi;
