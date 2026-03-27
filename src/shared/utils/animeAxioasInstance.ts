import axios from "axios";

export const animeAxiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});
