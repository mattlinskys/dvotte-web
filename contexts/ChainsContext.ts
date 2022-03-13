import { createContext } from "react";
import { IChain } from "types/chain";

export interface ChainsContextValue {
  chains: IChain[];
}

export const ChainsContext = createContext<ChainsContextValue>({ chains: [] });
