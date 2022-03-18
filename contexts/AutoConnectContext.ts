import { createContext } from "react";

export interface AutoConnectContextValue {
  isAutoConnecting?: boolean;
}

export const AutoConnectContext = createContext<AutoConnectContextValue>({
  isAutoConnecting: false,
});
