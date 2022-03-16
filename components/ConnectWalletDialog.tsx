import React from "react";
import Dialog, { DialogProps } from "components/Dialog";
import ConnectWallet from "components/ConnectWallet";

interface ConnectWalletDialogProps extends Omit<DialogProps, "title"> {}

const ConnectWalletDialog: React.FC<ConnectWalletDialogProps> = (props) => (
  <Dialog title="Connect Wallet" {...props}>
    <ConnectWallet />
  </Dialog>
);

export default ConnectWalletDialog;
