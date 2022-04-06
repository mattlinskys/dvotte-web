import React from "react";
import { QuestionIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Box,
  useDisclosure,
  ButtonProps,
} from "@chakra-ui/react";
import useActiveChain from "hooks/useActiveChain";
import Dialog from "components/Dialog";
import SwitchChainList from "components/SwitchChainList";

const SelectChainButton: React.FC<ButtonProps> = (props) => {
  const chain = useActiveChain();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={() => onOpen()}
        variant="outline"
        colorScheme="gray"
        leftIcon={<Icon as={QuestionIcon} />}
        rightIcon={<Icon as={ChevronDownIcon} />}
        isFullWidth
        justifyContent="flex-start"
        {...props}
      >
        <Box as="span" flexGrow="1" textAlign="left">
          {chain
            ? `${chain.name}${
                chain.nativeCurrency ? ` (${chain.nativeCurrency.name})` : ""
              }`
            : "Unsupported chain"}
        </Box>
      </Button>

      <Dialog title="Select chain" isOpen={isOpen} onClose={onClose}>
        <SwitchChainList />
      </Dialog>
    </>
  );
};

export default SelectChainButton;
