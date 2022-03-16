import React, { useCallback } from "react";
import useChains from "hooks/useChains";
import useActiveChain from "hooks/useActiveChain";
import useConnector from "hooks/useConnector";
import useLibrary from "hooks/useLibrary";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useToast,
} from "@chakra-ui/react";

interface SelectChainMenuProps {
  defaultLabel: string;
}

const SelectChainMenu: React.FC<SelectChainMenuProps> = ({ defaultLabel }) => {
  const connector = useConnector();
  const library = useLibrary();
  const chains = useChains();
  const chain = useActiveChain();
  const toast = useToast();

  const handleChainChange = useCallback(
    async (selectedChainId: number) => {
      const selectedChain = chains.find(({ id }) => id === selectedChainId)!;
      if (selectedChain) {
        try {
          await library?.provider?.request?.({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: `0x${selectedChain.id.toString(16)}`,
              },
            ],
          });
        } catch (err: any) {
          if (err.code === 4902 && connector instanceof InjectedConnector) {
            try {
              await library?.provider?.request?.({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${selectedChain.id.toString(16)}`,
                    chainName: selectedChain.name,
                    nativeCurrency: selectedChain.nativeCurrency,
                    rpcUrls: selectedChain.rpcUrls,
                    blockExplorerUrls: selectedChain.blockExplorers!.map(
                      (explorer) => explorer.url
                    ),
                  },
                ],
              });
            } catch (err: any) {
              console.error(err);
              toast({
                title: err.message,
                status: "error",
                isClosable: true,
                duration: 10_000,
              });
            }
          } else {
            console.error(err);
            toast({
              title: err.message,
              status: "error",
              isClosable: true,
              duration: 10_000,
            });
          }
        }
      }
    },
    [library]
  );

  return (
    <Menu isLazy>
      <MenuButton as={Button}>{chain?.name || defaultLabel}</MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          value={chain?.id.toString()}
          onChange={(chainId) => {
            handleChainChange(parseInt(chainId as string));
          }}
        >
          {chains.map(({ id, name, nativeCurrency }) => (
            <MenuItemOption key={id} value={id.toString()}>
              {name}
              {nativeCurrency && ` (${nativeCurrency.symbol})`}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default SelectChainMenu;
