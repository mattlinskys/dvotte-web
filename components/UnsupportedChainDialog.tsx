import React from "react";
import Dialog, { DialogProps } from "components/Dialog";
import { Text } from "@chakra-ui/react";
import SelectChainList from "components/SelectChainList";

interface UnsupportedChainDialogProps extends Omit<DialogProps, "title"> {}

const UnsupportedChainDialog: React.FC<UnsupportedChainDialogProps> = ({
  ...rest
}) => {
  return (
    <Dialog title="Unsupported chain" {...rest}>
      <Text textAlign="center">
        Your current chain is unsupported, please switch to one of the following
        chains:
      </Text>

      <SelectChainList mt="4" />
    </Dialog>
  );
};

export default UnsupportedChainDialog;
