import axios from "axios";

export const presetAxios = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ORIGIN;

  if (typeof window !== "undefined") {
    axios.interceptors.request.use(async (config) => {
      console.log("TESTETT", config);
      return config;
    });
  }
};
