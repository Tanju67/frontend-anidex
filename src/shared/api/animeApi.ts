import {
  type AllNewsType,
  type AnimeFilter,
  type AnimeImageType,
  type AnimeType,
  type BannerSliderType,
  type CharactersType,
  type EpisodesResponseType,
  type PersonType,
  type RecommendationsType,
  type ReviewsResponseType,
  type RowSliderResponse,
  type SingleEpisodeType,
  type SliderItemType,
  type VoiceActorDetailType,
} from "../schemas/animeSchema";
import type { AnimeRating, AnimeStatus } from "../utils/data";
import { baseAnimeApi } from "./baseAnimeApi";

export const animeApi = baseAnimeApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopAnime: builder.query<
      RowSliderResponse,
      { page: number; limit: number; type: AnimeType; filter: AnimeFilter }
    >({
      query: ({ page, limit, type, filter }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());
        params.append("sfw", ""); // flag

        if (type && type !== "all") {
          params.append("type", type);
        }

        if (filter && filter !== "all") {
          params.append("filter", filter);
        }

        return {
          url: `/top/anime?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return response;
      },
      keepUnusedDataFor: 60,
    }),

    getUpcomingAnime: builder.query<
      BannerSliderType,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/seasons/upcoming?sfw&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: { data: BannerSliderType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getRandomAnime: builder.query<SliderItemType, void>({
      query: () => ({
        url: `/random/anime?sfw`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getAnimeByGenre: builder.query<
      RowSliderResponse,
      {
        page: number;
        limit: number;
        genre?: number;
        type?: AnimeType;
        rating?: AnimeRating;
        status?: AnimeStatus;
        search?: string;
      }
    >({
      query: ({ page, limit, genre, type, rating, status, search }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());
        params.append("sfw", ""); // flag

        if (type && type !== "all") {
          params.append("type", type);
        }

        if (rating) {
          params.append("rating", rating);
        }

        if (genre) {
          params.append("genres", genre.toString());
        }

        if (status && status !== "all") {
          params.append("status", status);
        }

        if (search) {
          params.append("q", search);
        }

        return {
          url: `/anime?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return response;
      },
      keepUnusedDataFor: 60,
    }),

    getCurrentSeason: builder.query<
      RowSliderResponse,
      {
        page: number;
        limit: number;
        type?: AnimeType;
        includeContinuing?: boolean;
      }
    >({
      query: ({ page, limit, type, includeContinuing }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());
        params.append("sfw", ""); // flag

        if (type && type !== "all") {
          params.append("filter", type);
        }

        if (includeContinuing) {
          params.append("continuing", ""); // flag
        }

        return {
          url: `/seasons/now?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
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
  useLazyGetTopAnimeQuery,
  useGetUpcomingAnimeQuery,
  useGetRandomAnimeQuery,
  useGetAnimeByGenreQuery,
  useLazyGetAnimeByGenreQuery,
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
