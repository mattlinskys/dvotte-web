import React from "react";
import Dialog, { DialogProps } from "components/Dialog";
import { Text } from "@chakra-ui/react";
import SwitchChainList from "components/SwitchChainList";

interface UnsupportedChainDialogProps extends Omit<DialogProps, "title"> {}

const UnsupportedChainDialog: React.FC<UnsupportedChainDialogProps> = ({
  ...rest
}) => {
  return (
    <Dialog title="Unsupported chain" {...rest}>
      <Text textAlign="center">
        Your current chain is not supported, please switch to one of the
        following chains:
      </Text>

      <SwitchChainList mt="4" />
    </Dialog>
  );
};

export default UnsupportedChainDialog;
