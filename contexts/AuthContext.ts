import { createContext } from "react";

export interface AuthContextValue {
  authenticate: () => Promise<void>;
  isAuthenticated: boolean;
  authenticatedAddress?: string;
  isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  authenticate: async () => {},
  isAuthenticated: false,
  isInitializing: true,
});
