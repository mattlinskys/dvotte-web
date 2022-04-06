import React, { useMemo } from "react";
import useWalletConnected from "hooks/useWalletConnected";
import WrongChainDialog from "components/WrongChainDialog";
import useChains from "hooks/useChains";
import useActiveChain from "hooks/useActiveChain";

interface WrongChainDialogProviderProps {
  chainId: string;
}

const WrongChainDialogProvider: React.FC<WrongChainDialogProviderProps> = ({
  chainId,
}) => {
  const isConnected = useWalletConnected();
  const chains = useChains();
  const chain = useMemo(
    () => chains.find(({ id }) => id.toString() === chainId),
    [chains, chainId]
  );
  const activeChain = useActiveChain();

  return (
    <WrongChainDialog
      isOpen={
        isConnected && !!chain && !!activeChain && chain.id !== activeChain.id
      }
      targetChain={chain}
    />
  );
};

export default WrongChainDialogProvider;
