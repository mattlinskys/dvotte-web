import React from "react";
import { Text } from "@chakra-ui/react";
import Dialog, { DialogProps } from "components/Dialog";
import SelectChainList, {
  SelectChainListProps,
} from "components/SelectChainList";

interface SelectChainDialogProps
  extends Omit<DialogProps, "title" | "children">,
    Pick<SelectChainListProps, "onSelectChain"> {
  description?: React.ReactNode;
}

const SelectChainDialog: React.FC<SelectChainDialogProps> = ({
  description,
  onSelectChain,
  ...rest
}) => {
  return (
    <Dialog title="Select chain" {...rest}>
      {description && (
        <Text mb="4" textAlign="center">
          {description}
        </Text>
      )}
      <SelectChainList onSelectChain={onSelectChain} />
    </Dialog>
  );
};

export default SelectChainDialog;
