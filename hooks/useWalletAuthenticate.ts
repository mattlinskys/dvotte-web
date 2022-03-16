import { useCallback } from "react";
import useSignMessage from "hooks/useSignMessage";
import { genNonceToken, verifySignature } from "api/authApi";
import useAccountAddress from "hooks/useAccountAddress";
import jwtDecode from "jwt-decode";

const useWalletAuthenticate = () => {
  const signMessage = useSignMessage();
  const address = useAccountAddress();

  return useCallback(async () => {
    const {
      data: { nonceToken },
    } = await genNonceToken(address!);
    const { nonce } = jwtDecode(nonceToken) as { nonce: string };

    const signature = await signMessage(nonce);
    const {
      data: { accessToken },
    } = await verifySignature(signature, nonceToken);

    return accessToken;
  }, [signMessage, address]);
};

export default useWalletAuthenticate;
