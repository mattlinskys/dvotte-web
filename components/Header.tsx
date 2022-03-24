import React, { useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useStyleConfig,
} from "@chakra-ui/react";
import SelectChainButton from "components/SelectChainButton";
import { useTranslation } from "next-i18next";
import { AddIcon, ChevronDownIcon, QuestionIcon } from "@chakra-ui/icons";
import useAccountAddress from "hooks/useAccountAddress";
import { shortenAddress } from "utils/addressUtils";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import { useWeb3React } from "@web3-react/core";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyleConfig("Header");
  const accountAddress = useAccountAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deactivate } = useWeb3React();

  useEffect(() => {
    if (!!accountAddress && isOpen) {
      onClose();
    }
  }, [!!accountAddress]);

  return (
    <>
      <Box as="header" sx={styles}>
        <HStack h="full" mx="auto" justify="space-between">
          <HStack>
            <SelectChainButton />
          </HStack>

          <HStack spacing="3">
            <Menu isLazy placement="bottom-end">
              <MenuButton
                as={Button}
                variant="outline"
                leftIcon={<Icon as={AddIcon} />}
              >
                Create
              </MenuButton>
              <MenuList>
                <Link href="/contracts/new" passHref>
                  <MenuItem as="a">Deploy new contract</MenuItem>
                </Link>
                <Link href="/projects/new" passHref>
                  <MenuItem as="a">Create project</MenuItem>
                </Link>
              </MenuList>
            </Menu>

            {accountAddress ? (
              <Menu isLazy placement="bottom-end">
                <MenuButton
                  as={Button}
                  variant="outline"
                  colorScheme="gray"
                  leftIcon={<Icon as={QuestionIcon} />}
                  rightIcon={<Icon as={ChevronDownIcon} />}
                >
                  {shortenAddress(accountAddress, 6)}
                </MenuButton>

                <MenuList p="2">
                  <Link href="/contracts" passHref>
                    <Button
                      as="a"
                      variant="ghost"
                      isFullWidth
                      justifyContent="flex-start"
                    >
                      Contracts
                    </Button>
                  </Link>
                  <Link href="/projects" passHref>
                    <Button
                      as="a"
                      variant="ghost"
                      isFullWidth
                      justifyContent="flex-start"
                    >
                      Projects
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deactivate()}
                    variant="ghost"
                    colorScheme="red"
                    isFullWidth
                    justifyContent="flex-start"
                  >
                    Disconnect
                  </Button>
                </MenuList>
              </Menu>
            ) : (
              <Button onClick={onOpen}>Connect Wallet</Button>
            )}
          </HStack>
        </HStack>
      </Box>

      <ConnectWalletDialog isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
