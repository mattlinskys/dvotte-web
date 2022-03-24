import { createContext } from "react";
import type { IContract } from "types/contract";

export interface RecentlyViewiedContractsContextValue {
  contracts?: IContract[];
  addContract: (pair: IContract) => void;
}

export const RecentlyViewiedContractsContext =
  createContext<RecentlyViewiedContractsContextValue>({
    contracts: [],
    addContract: () => {},
  });
