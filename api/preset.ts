import axios from "axios";
import { ACCESS_TOKEN_KEY } from "constants/storage";

export const presetApi = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ORIGIN;

  if (typeof window !== "undefined") {
    axios.interceptors.request.use((config) => {
      if (!config.url!.startsWith("/auth")) {
        const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
        if (accessToken) {
          config.headers!["Authorization"] = `Bearer ${accessToken}`;
        }
      }
      return config;
    });
  }
};
