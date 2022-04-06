import React from "react";
import { Button, Icon, StackProps, VStack } from "@chakra-ui/react";
import useChains from "hooks/useChains";
import { IChain } from "types/chain";
import { CheckIcon } from "@chakra-ui/icons";

export interface SelectChainListProps extends StackProps {
  onSelectChain: (chain: IChain) => void;
  selectedChainId?: IChain["id"];
  loadingChainId?: IChain["id"];
}

const SelectChainList: React.FC<SelectChainListProps> = ({
  onSelectChain,
  selectedChainId,
  loadingChainId,
  ...rest
}) => {
  const chains = useChains();

  return (
    <VStack
      align="stretch"
      spacing="2"
      p="2"
      m="-2"
      maxHeight="72"
      overflowY="auto"
      {...rest}
    >
      {chains.map((chain) => {
        const isSelected = chain.id === selectedChainId;

        return (
          <Button
            key={chain.id}
            onClick={() => onSelectChain(chain)}
            variant="outline"
            flexShrink="0"
            isDisabled={isSelected}
            isLoading={chain.id === loadingChainId}
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
