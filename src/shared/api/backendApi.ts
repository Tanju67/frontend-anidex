import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
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
  tagTypes: ["User"],
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
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  backendApi;
