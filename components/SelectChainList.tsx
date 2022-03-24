import React, { useCallback } from "react";
import {
  Button,
  Icon,
  StackProps,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useChains from "hooks/useChains";
import useSwitchChain from "hooks/useSwitchChain";
import { IChain } from "types/chain";
import useActiveChain from "hooks/useActiveChain";
import { CheckIcon } from "@chakra-ui/icons";

const SelectChainList: React.FC<StackProps> = (props) => {
  const chains = useChains();
  const activeChain = useActiveChain();
  const switchChain = useSwitchChain();
  const toast = useToast();

  const handleChainSwitch = useCallback(
    async (chain: IChain) => {
      try {
        await switchChain(chain);
      } catch (err: any) {
        console.error(err);
        toast({
          title: err.message,
          status: "error",
          isClosable: true,
          duration: 10_000,
        });
      }
    },
    [switchChain]
  );

  return (
    <VStack
      align="stretch"
      spacing="2"
      p="2"
      m="-2"
      maxHeight="72"
      overflowY="auto"
      {...props}
    >
      {chains.map((chain) => {
        const isSelected = activeChain && activeChain.id === chain.id;

        return (
          <Button
            key={chain.id}
            onClick={() => handleChainSwitch(chain)}
            variant="outline"
            flexShrink="0"
            isDisabled={isSelected}
            leftIcon={isSelected ? <Icon as={CheckIcon} /> : undefined}
          >
            {chain.name}
            {chain.nativeCurrency && ` (${chain.nativeCurrency.symbol})`}
          </Button>
        );
      })}
    </VStack>
  );
};

export default SelectChainList;
