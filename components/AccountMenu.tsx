import React from "react";
import Link from "next/link";
import { QuestionIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  VStack,
  HStack,
  Center,
  Box,
  IconButton,
  Text,
} from "@chakra-ui/react";
import CopyButtonWrapper from "components/CopyButtonWrapper";
import ContractsIcon from "components/icons/ContractsIcon";
import DisconnectIcon from "components/icons/DisconnectIcon";
import DotIcon from "components/icons/DotIcon";
import ProjectsIcon from "components/icons/ProjectsIcon";
import SelectChainButton from "components/SelectChainButton";
import { shortenAddress } from "utils/addressUtils";
import { useWeb3React } from "@web3-react/core";
import { getConnectorIcon, getConnectorKey } from "config/connectors";
import CopyIcon from "components/icons/CopyIcon";
import { useTranslation } from "next-i18next";

const AccountMenu: React.FC = () => {
  const { t } = useTranslation();
  const { connector, account, deactivate } = useWeb3React();
  const connectorKey = getConnectorKey(connector!);
  const ConnectorIcon = getConnectorIcon(connector!);

  return (
    <Menu isLazy placement="bottom-end">
      <MenuButton
        as={Button}
        variant="outline"
        colorScheme="gray"
        leftIcon={<Icon as={QuestionIcon} />}
        rightIcon={<Icon as={ChevronDownIcon} />}
      >
        {shortenAddress(account!, 6)}
      </MenuButton>

      <MenuList p="2" maxW="sm">
        <VStack spacing="2" align="stretch">
          <HStack p="2" bg="gray.100" borderRadius="xl">
            <Center
              flexShrink="0"
              rounded="full"
              bg="white"
              w="8"
              h="8"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.300"
            >
              <Icon as={ConnectorIcon} w="5" h="auto" />
            </Center>

            <Box flexGrow="1" overflow="hidden">
              <Text lineHeight="1.375" fontWeight="medium" isTruncated>
                {shortenAddress(account!, 10)}
              </Text>
              <Text fontSize="sm" lineHeight="1.25" color="gray.600">
                <Icon
                  as={DotIcon}
                  w="2"
                  h="auto"
                  verticalAlign="middle"
                  color="#21D041"
                  mr="1"
                />
                {t(`connected-${connectorKey}`)}
              </Text>
            </Box>

            <CopyButtonWrapper text={account!}>
              <IconButton
                flexShrink="0"
                aria-label="copy"
                icon={<Icon as={CopyIcon} w="5" h="5" />}
                colorScheme="blackAlpha"
                variant="ghost"
                size="sm"
              />
            </CopyButtonWrapper>
          </HStack>

          <SelectChainButton />

          <Link href="/projects" passHref>
            <Button
              as="a"
              variant="ghost"
              colorScheme="gray"
              justifyContent="flex-start"
              leftIcon={<Icon as={ProjectsIcon} />}
            >
              {t("projects")}
            </Button>
          </Link>

          <Link href="/contracts" passHref>
            <Button
              as="a"
              variant="ghost"
              colorScheme="gray"
              justifyContent="flex-start"
              leftIcon={<Icon as={ContractsIcon} />}
            >
              {t("contracts")}
            </Button>
          </Link>

          <Button
            onClick={() => deactivate()}
            variant="ghost"
            colorScheme="red"
            justifyContent="flex-start"
            leftIcon={<Icon as={DisconnectIcon} />}
          >
            {t("disconnect")}
          </Button>
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;
