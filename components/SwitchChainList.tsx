import React, { useCallback, useState } from "react";
import { StackProps, useToast } from "@chakra-ui/react";
import useSwitchChain from "hooks/useSwitchChain";
import { IChain } from "types/chain";
import SelectChainList from "components/SelectChainList";
import useActiveChain from "hooks/useActiveChain";

const SwitchChainList: React.FC<StackProps> = (props) => {
  const switchChain = useSwitchChain();
  const activeChain = useActiveChain();
  const toast = useToast();
  const [pendingChainId, setPendingChainId] = useState<IChain["id"]>();

  const handleChainSelect = useCallback(
    async (chain: IChain) => {
      setPendingChainId(chain.id);
      try {
        await switchChain(chain);
      } catch (err: any) {
        toast({
          title: typeof err === "string" ? err : err.message,
          status: "error",
          isClosable: true,
          duration: 7500,
        });
      } finally {
        setPendingChainId(undefined);
      }
    },
    [switchChain]
  );

  return (
    <SelectChainList
      onSelectChain={handleChainSelect}
      selectedChainId={activeChain?.id}
      loadingChainId={pendingChainId}
      {...props}
    />
  );
};

export default SwitchChainList;
