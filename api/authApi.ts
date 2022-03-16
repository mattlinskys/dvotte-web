import axios, { AxiosRequestConfig } from "axios";

export const genNonceToken = (address: string, config?: AxiosRequestConfig) =>
  axios.post<{ nonceToken: string }>("/auth/nonce", { address }, config);

export const verifySignature = (
  signature: string,
  nonceToken: string,
  config?: AxiosRequestConfig
) =>
  axios.post<{ accessToken: string }>(
    "/auth/signature",
    { signature, nonceToken },
    config
  );
