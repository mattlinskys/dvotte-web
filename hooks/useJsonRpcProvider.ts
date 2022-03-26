import { providers } from "ethers";
import { useMemo } from "react";

const useJsonRpcProvider = (rpc: string) =>
  useMemo(
    () =>
      new providers.JsonRpcProvider(
        rpc.replace("${INFURA_API_KEY}", process.env.NEXT_PUBLIC_INFURA_API_KEY)
      ),
    [rpc]
  );

export default useJsonRpcProvider;
