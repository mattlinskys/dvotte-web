import React, { useCallback, useState } from "react";
import { injected } from "connectors/injected";
import { useWeb3React } from "@web3-react/core";
import { Button, VStack } from "@chakra-ui/react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";

const ConnectWallet: React.FC = () => {
  const { activate } = useWeb3React();
  // TODO: ConnectorsContext/Provider
  const connectors = [injected];
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
      {connectors.map((connector, i) => (
        <Button
          key={i}
          onClick={() => handleConnect(connector)}
          isLoading={connector === connectingConnector}
        >
          Connect {connector instanceof InjectedConnector ? "MetaMask" : "-"}
        </Button>
      ))}
    </VStack>
  );
};

export default ConnectWallet;
