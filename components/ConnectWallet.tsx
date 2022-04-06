import React, { useCallback, useState } from "react";
import { injected, walletConnect } from "connectors";
import { useWeb3React } from "@web3-react/core";
import { Button, Icon, VStack } from "@chakra-ui/react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { getConnectorIcon, getConnectorKey } from "config/connectors";
import { useTranslation } from "next-i18next";

const connectors = [injected, walletConnect];

const ConnectWallet: React.FC = () => {
  const { t } = useTranslation();
  const { activate } = useWeb3React();
  const [connectingConnector, setConnectingConnector] =
    useState<AbstractConnector | null>(null);

  const handleConnect = useCallback(async (connector: AbstractConnector) => {
    try {
      setConnectingConnector(connector);
      await activate(connector);
    } finally {
      setConnectingConnector(null);
    }
  }, []);

  return (
    <VStack align="stretch">
      {connectors.map((connector, i) => {
        const connectorKey = getConnectorKey(connector);
        const ConnectorIcon = getConnectorIcon(connector);

        return (
          <Button
            key={i}
            onClick={() => handleConnect(connector)}
            isLoading={connector === connectingConnector}
            variant="outline"
            colorScheme={connectorKey}
            leftIcon={<Icon as={ConnectorIcon} w="5" h="auto" />}
          >
            {t(`common:connect-${connectorKey}`)}
          </Button>
        );
      })}
    </VStack>
  );
};

export default ConnectWallet;
