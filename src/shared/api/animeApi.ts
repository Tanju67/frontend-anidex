import {
  type AllNewsType,
  type AnimeFilter,
  type AnimeImageType,
  type AnimeType,
  type BannerSliderType,
  type CharactersType,
  type EpisodesResponseType,
  type PersonType,
  type PromoResponseType,
  type RecommendationsType,
  type ReviewsResponseType,
  type RowSliderResponse,
  type SingleEpisodeType,
  type SliderItemType,
  type VoiceActorDetailType,
} from "../schemas/animeSchema";
import type { AnimeRating, AnimeStatus } from "../utils/data";
import { baseAnimeApi } from "./baseAnimeApi";

/**
 * Anime API Service
 * * Extends the baseAnimeApi by injecting specific Jikan v4 endpoints.
 * * Handles all anime-related data fetching including top charts,
 * seasonal updates, and detailed resource information.
 */
export const animeApi = baseAnimeApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetches top-ranked anime based on filters and type.
     * @param {page, limit, type, filter}
     */
    getTopAnime: builder.query<
      RowSliderResponse,
      { page: number; limit: number; type: AnimeType; filter: AnimeFilter }
    >({
      query: ({ page, limit, type, filter }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());
        params.append("sfw", ""); // Safe For Work filter

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
      keepUnusedDataFor: 60,
    }),

    /**
     * Fetches upcoming anime for future seasons.
     */
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

    /**
     * Retrieves a single random anime recommendation.
     */
    getRandomAnime: builder.query<SliderItemType, void>({
      query: () => ({
        url: `/random/anime?sfw`,
        method: "GET",
      }),
      transformResponse: (response: { data: SliderItemType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    /**
     * Advanced Search: Fetches anime by genre, rating, status, or search query.
     */
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
      keepUnusedDataFor: 5,
    }),

    /**
     * Fetches anime airing in the current season.
     */
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
      keepUnusedDataFor: 60,
    }),

    /**
     * Resource Details: Fetches full details for a single anime by ID.
     */
    getAnimeById: builder.query<SliderItemType, string>({
      query: (id) => ({
        url: `/anime/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: SliderItemType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    /**
     * Retrieves the character list and their voice actors for a specific anime.
     */
    getCharactersByAnimeId: builder.query<CharactersType, string>({
      query: (id) => ({
        url: `/anime/${id}/characters`,
        method: "GET",
      }),
      transformResponse: (response: { data: CharactersType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    /**
     * Fetches official images and posters for an anime.
     */
    getAnimePictureById: builder.query<AnimeImageType, string>({
      query: (id) => ({
        url: `/anime/${id}/pictures`,
        method: "GET",
      }),
      transformResponse: (response: { data: AnimeImageType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    /**
     * Retrieves user reviews for a specific anime.
     */
    getAnimeReviewsById: builder.query<
      ReviewsResponseType,
      { id: string; page: number }
    >({
      query: ({ id, page }) => ({
        url: `/anime/${id}/reviews?page=${page}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60,
    }),

    /**
     * Fetches the episode list for an anime.
     */
    getAnimeEpisodesById: builder.query<
      EpisodesResponseType,
      { id: string; page?: number }
    >({
      query: ({ id, page }) => ({
        url: `/anime/${id}/episodes?page=${page}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60,
    }),

    /**
     * Fetches details for a specific episode (Summary, Title, etc.).
     */
    getEpisodeByEpisodeId: builder.query<
      SingleEpisodeType,
      { id: string; episode: number }
    >({
      query: ({ id, episode }) => ({
        url: `/anime/${id}/episodes/${episode}`,
        method: "GET",
      }),
      transformResponse: (response: { data: SingleEpisodeType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    /**
     * Recommendations: Fetches similar anime based on the current resource.
     */
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

    /**
     * Fetches official news articles related to the anime.
     */
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

    /**
     * Detailed Character Info: Fetches full bio and media for a character.
     */
    getSingleCharacterById: builder.query<PersonType, string>({
      query: (id) => ({
        url: `/characters/${id}/full`,
        method: "GET",
      }),
      transformResponse: (response: { data: PersonType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    /**
     * Detailed Person Info: Fetches bio and roles for voice actors (Seiyuu).
     */
    getPeopleFullById: builder.query<VoiceActorDetailType, string>({
      query: (id) => ({
        url: `/people/${id}/full`,
        method: "GET",
      }),
      transformResponse: (response: { data: VoiceActorDetailType }) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
    }),

    getRecentPromos: builder.query<PromoResponseType, { page: number }>({
      query: ({ page }) => ({
        url: `/watch/promos?page=${page}`,
        method: "GET",
      }),
      keepUnusedDataFor: 300,
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
  useGetRecentPromosQuery,
  useLazyGetRecentPromosQuery,
} = animeApi;
