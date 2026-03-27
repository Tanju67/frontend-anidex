import axios from "axios";

export const backendAxiosInstance = axios.create({
  baseURL: "http://localhost:10000/api/v1",
});

backendAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
