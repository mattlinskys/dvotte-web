import { useCallback } from "react";
import useSigner from "hooks/useSigner";

const useSignMessage = () => {
  const signer = useSigner();
  return useCallback(
    (message: string) => signer!.signMessage(message),
    [signer]
  );
};

export default useSignMessage;
