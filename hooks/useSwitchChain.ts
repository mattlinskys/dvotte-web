import { useCallback } from "react";
import useLibrary from "hooks/useLibrary";
import useConnector from "hooks/useConnector";
import { InjectedConnector } from "@web3-react/injected-connector";
import type { IChain } from "types/chain";

const useSwitchChain = () => {
  const connector = useConnector();
  const library = useLibrary();

  return useCallback(
    async (chain: IChain) => {
      try {
        await library?.provider?.request?.({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${chain.id.toString(16)}`,
            },
          ],
        });
      } catch (err: any) {
        if (err.code === 4902 && connector instanceof InjectedConnector) {
          await library?.provider?.request?.({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chain.id.toString(16)}`,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: chain.rpcUrls,
                blockExplorerUrls: chain.blockExplorers!.map(
                  (explorer) => explorer.url
                ),
              },
            ],
          });
        } else {
          throw err;
        }
      }
    },
    [library, connector]
  );
};

export default useSwitchChain;
