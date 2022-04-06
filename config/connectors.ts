import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import MetaMaskIcon from "components/icons/MetaMaskIcon";
import WalletConnectIcon from "components/icons/WalletConnectIcon";

export const getConnectorKey = (connector: AbstractConnector) => {
  if (connector instanceof InjectedConnector) {
    return "metamask";
  } else if (connector instanceof WalletConnectConnector) {
    return "walletConnect";
  }
};

export const getConnectorIcon = (connector: AbstractConnector) => {
  if (connector instanceof InjectedConnector) {
    return MetaMaskIcon;
  } else if (connector instanceof WalletConnectConnector) {
    return WalletConnectIcon;
  }
};
