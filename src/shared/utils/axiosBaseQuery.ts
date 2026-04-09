import type { AxiosError, AxiosRequestConfig } from "axios";
import { animeAxiosInstance } from "../utils/animeAxioasInstance";
import pLimit from "p-limit";
import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";

const limit = pLimit(3); // aynı anda 3 request
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let lastRequestTime = 0;

const RATE_LIMIT_MS = 550; // ~3 req/sec (1000 / 3 ≈ 333)

const scheduleRequest = async () => {
  const now = Date.now();
  const diff = now - lastRequestTime;

  if (diff < RATE_LIMIT_MS) {
    const jitter = Math.random() * 100;
    await delay(RATE_LIMIT_MS - diff + jitter);
  }
  lastRequestTime = Date.now();
};

type JikanError = {
  status: number;
  type: string;
  messages?: Record<string, string[]>;
  error?: string;
};

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

// store/baseApi.ts
export const axiosBaseQuery =
  (axiosInst = animeAxiosInstance): BaseQueryFn<AxiosBaseQueryArgs> =>
  async (
    { url, method, data, params }: AxiosBaseQueryArgs,
    api: BaseQueryApi,
  ) => {
    // 1. En başta iptal kontrolü
    if (api.signal.aborted) {
      return { error: { status: 0, data: { message: "Request aborted" } } };
    }

    try {
      const result = await limit(async () => {
        // 2. Kuyrukta beklerken iptal kontrolü
        if (api.signal.aborted) {
          throw new axios.Cancel("Canceled before request");
        }

        await scheduleRequest();

        // 3. İstek tam çıkarken son kontrol
        if (api.signal.aborted) {
          throw new axios.Cancel("Canceled after delay");
        }

        return axiosInst({ url, method, data, params, signal: api.signal });
      });

      // Jikan API özel durum kontrolü
      const apiStatus = result.data?.status;
      if (apiStatus && apiStatus >= 400) {
        throw { response: { status: apiStatus, data: result.data } };
      }

      return { data: result.data };
    } catch (error: any) {
      // IPTAL DURUMU: Network panelinde Cancelled görünecek ve middleware yönlendirme yapmayacak
      if (
        axios.isCancel(error) ||
        error.name === "AbortError" ||
        api.signal.aborted
      ) {
        return { error: { status: 0, data: { message: "Request aborted" } } };
      }

      const err = error as AxiosError<JikanError>;
      const status = err.response?.status ?? 0;
      const data = err.response?.data;

      // SENİN KULLANICI DOSTU MESAJLARIN
      let userMessage = "Something went wrong. Please try again.";

      switch (status) {
        case 400:
          userMessage = "Oops! There was a problem with your request.";
          break;
        case 404:
          userMessage =
            "Sorry! The resource you are looking for was not found.";
          break;
        case 429:
          userMessage =
            "Too many requests! Please wait a moment and try again.";
          break;
        case 500:
          userMessage = "Internal server error. Please try again later.";
          break;
        case 503:
          userMessage = "Service is currently unavailable. Please try later.";
          break;
      }

      return {
        error: {
          status,
          data: {
            ...data,
            message: userMessage,
          },
        },
      };
    }
  };
