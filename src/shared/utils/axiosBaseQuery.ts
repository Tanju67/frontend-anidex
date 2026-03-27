import type { AxiosError, AxiosRequestConfig } from "axios";
import { animeAxiosInstance } from "../utils/animeAxioasInstance";
import pLimit from "p-limit";

const limit = pLimit(3); // aynı anda 3 request

let requestCount = 0;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
  (axiosInst = animeAxiosInstance) =>
  async ({ url, method, data, params }: AxiosBaseQueryArgs) => {
    try {
      const result = await limit(async () => {
        requestCount++;
        if (requestCount % 3 === 0) await delay(2000);
        return axiosInst({ url, method, data, params });
      });
      const apiStatus = result.data?.status;
      const apiError = result.data?.error || result.data?.messages;

      if (apiStatus && apiStatus >= 400) {
        // HTTP status değil ama API hatası var → reject et
        const error = new Error(
          apiError?.toString() || "API returned an error",
        ) as AxiosError<JikanError>;
        error.response = {
          status: apiStatus,
          data: result.data,
          statusText: "",
          headers: {},
          config: result.config,
        };
        throw error;
      }

      return { data: result.data };
    } catch (error: unknown) {
      console.log(error);
      const err = error as AxiosError<JikanError>;
      const status = err.response?.status ?? 0;
      const data = err.response?.data;

      // Kullanıcı dostu mesaj
      let userMessage = "Something went wrong. Please try again.";

      switch (status) {
        case 400:
          userMessage = "Oops! There was a problem with your request.";
          break;
        case 404:
          userMessage =
            "Sorry! The resource you are looking for was not found.";
          break;
        case 405:
          userMessage = "This action is not allowed.";
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

      console.log("AXIOS ERROR RAW MESSAGE:", data?.error || data?.messages);

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
