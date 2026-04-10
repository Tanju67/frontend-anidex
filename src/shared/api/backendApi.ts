import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RegisterFormData } from "../schemas/backendSchema";
import type { RegisterResponse } from "../types/types";

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
  endpoints: (builder) => ({
    // Normal Register
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = backendApi;
