import React from "react";
import Link from "next/link";
import SelectChainMenu from "components/SelectChainMenu";
import { Box, HStack, useStyleConfig } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyleConfig("Header");

  return (
    <Box as="header" sx={styles}>
      <HStack h="full" mx="auto" justify="space-between">
        <HStack>
          <SelectChainMenu defaultLabel={t("select-chain")} />
        </HStack>
        <HStack as="nav" spacing="4">
          <Link href="/contracts/new">Deploy new contract</Link>
          <Link href="/projects/new">Create project</Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
