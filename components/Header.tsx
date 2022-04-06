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
import { useTranslation } from "next-i18next";
import { AddIcon } from "@chakra-ui/icons";
import useAccountAddress from "hooks/useAccountAddress";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import AccountMenu from "components/AccountMenu";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyleConfig("Header");
  const accountAddress = useAccountAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!!accountAddress && isOpen) {
      onClose();
    }
  }, [!!accountAddress]);

  return (
    <>
      <Box as="header" sx={styles}>
        <HStack h="full" mx="auto" justify="space-between">
          <HStack></HStack>

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
              <AccountMenu />
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
