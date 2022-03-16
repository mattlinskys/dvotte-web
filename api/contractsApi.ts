import axios, { AxiosRequestConfig } from "axios";
import type { IContract } from "types/contract";

export const registerContract = (
  data: {
    address: string;
    chainId: number;
  },
  config?: AxiosRequestConfig
) => axios.post<IContract>(`/contracts`, data, config);
