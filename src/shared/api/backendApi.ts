import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateWatchlistItem,
  CreateWatchlistResponse,
  CurrentUserResponse,
  LoginFormData,
  RegisterFormData,
  User,
  UserAllAnimeResponse,
} from "../schemas/backendSchema";
import type { LoginResponse, RegisterResponse } from "../types/types";

/**
 * Backend API Service
 * * Handles all authenticated and unauthenticated interactions with the core backend.
 * Uses RTK Query for state management, caching, and automatic re-fetching.
 */

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-anidex.onrender.com/api/v1",

    /**
     * Injects the JWT token from localStorage into the Authorization header
     * for all outgoing requests.
     */ prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Anime"],
  endpoints: (builder) => ({
    /**
     * Registers a new user with fullName, email and password.
     */
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    /**
     * Authenticates user and returns a session token.
     */
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    /**
     * Retrieves the profile of the currently authenticated user.
     */
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/current",
      transformResponse: (response: CurrentUserResponse) => response.data,
      providesTags: ["User"],
    }),

    /**
     * Handles Google OAuth authentication via identity token.
     */
    googleLogin: builder.mutation<LoginResponse, { idToken: string }>({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * Adds a new anime to the user's personal watchlist.
     * Invalidates "Anime" tag to trigger list refresh.
     */
    createAnime: builder.mutation<CreateWatchlistResponse, CreateWatchlistItem>(
      {
        query: (animeData) => ({
          url: "/anime",
          method: "POST",
          body: animeData,
        }),
        invalidatesTags: ["Anime"],
      },
    ),

    /**
     * Fetches details for a single anime from the user's watchlist.
     */
    getSingleAnime: builder.query<CreateWatchlistItem, string>({
      query: (id) => `/anime/${id}`,

      transformResponse: (response: CreateWatchlistResponse) => {
        return response.data;
      },
      providesTags: ["Anime"],
    }),

    /**
     * Removes an anime from the user's watchlist.
     */
    deleteAnime: builder.mutation<void, string>({
      query: (id) => ({
        url: `/anime/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Anime"],
    }),

    getUserAllAnime: builder.query<
      UserAllAnimeResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/anime?limit=${limit}&page=${page}`,
      transformResponse: (response: UserAllAnimeResponse) => {
        return response;
      },
      providesTags: ["Anime"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useGoogleLoginMutation,
  useCreateAnimeMutation,
  useGetSingleAnimeQuery,
  useDeleteAnimeMutation,
  useLazyGetUserAllAnimeQuery,
} = backendApi;
