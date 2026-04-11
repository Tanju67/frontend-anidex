import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateWatchlistItem,
  CreateWatchlistResponse,
  CurrentUserResponse,
  LoginFormData,
  RegisterFormData,
  User,
} from "../schemas/backendSchema";
import type { LoginResponse, RegisterResponse } from "../types/types";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Anime"],
  endpoints: (builder) => ({
    // Normal Register
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/current",
      transformResponse: (response: CurrentUserResponse) => response.data,
      providesTags: ["User"],
    }),

    googleLogin: builder.mutation<LoginResponse, { idToken: string }>({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

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

    getSingleAnime: builder.query<CreateWatchlistItem, string>({
      query: (id) => `/anime/${id}`,

      transformResponse: (response: CreateWatchlistResponse) => {
        return response.data;
      },
      providesTags: ["Anime"],
    }),

    deleteAnime: builder.mutation<void, string>({
      query: (id) => ({
        url: `/anime/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Anime"],
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
} = backendApi;
