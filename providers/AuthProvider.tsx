import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, AuthContextValue } from "contexts/AuthContext";
import { ACCESS_TOKEN_KEY } from "constants/storage";
import { genNonceToken, verifySignature } from "api/authApi";
import jwtDecode from "jwt-decode";
import useSignMessage from "hooks/useSignMessage";
import useAccountAddress from "hooks/useAccountAddress";

interface AuthProviderProps {
  expireThreshold?: number;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  expireThreshold = 3 * 60,
  children,
}) => {
  const signMessage = useSignMessage();
  const address = useAccountAddress();
  const [isInitializing, setInitializing] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const authenticatedAddress = useMemo(() => {
    if (accessToken) {
      try {
        const { address, exp } = jwtDecode(accessToken) as {
          address: string;
          exp: number;
        };
        return exp - expireThreshold > Date.now() / 1000 ? address : null;
      } catch {}
    }
    return null;
  }, [accessToken, expireThreshold]);

  const authenticate = useCallback(async () => {
    try {
      const {
        data: { nonceToken },
      } = await genNonceToken(address!);
      const { nonce } = jwtDecode(nonceToken) as { nonce: string };

      const signature = await signMessage(nonce);
      const {
        data: { accessToken },
      } = await verifySignature(signature, nonceToken);

      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      setAccessToken(accessToken);
    } catch (err) {
      console.error(err);
    }
  }, [address]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      setAccessToken(accessToken);
    }

    setInitializing(false);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    try {
      const { exp } = jwtDecode(accessToken) as { exp: number };
      const timeout = setTimeout(
        () => {
          setAccessToken(null);
        },
        // Invalidate token before expire
        exp - expireThreshold - Date.now() / 1000
      );

      return () => {
        clearTimeout(timeout);
      };
    } catch {}
  }, [accessToken, expireThreshold]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isInitializing,
      isAuthenticated:
        !!authenticatedAddress && authenticatedAddress === address,
      authenticate,
    }),
    [isInitializing, authenticatedAddress, address, authenticate]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
