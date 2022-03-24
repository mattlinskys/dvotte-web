import React, { useContext } from "react";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import { AutoConnectContext } from "contexts/AutoConnectContext";
import useWalletConnected from "hooks/useWalletConnected";

const ConnectWalletDialogProvider: React.FC = () => {
  const isConnected = useWalletConnected();
  const { isAutoConnecting } = useContext(AutoConnectContext);

  return (
    <ConnectWalletDialog isOpen={isAutoConnecting === false && !isConnected} />
  );
};

export default ConnectWalletDialogProvider;
