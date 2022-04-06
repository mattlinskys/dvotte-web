import React, { useCallback, useState } from "react";
import useSwitchChain from "hooks/useSwitchChain";
import { Button, Tag, Text, useToast } from "@chakra-ui/react";
import Dialog, { DialogProps } from "components/Dialog";
import type { IChain } from "types/chain";

interface WrongChainDialogProps
  extends Omit<DialogProps, "title" | "children"> {
  targetChain?: IChain;
}

const WrongChainDialog: React.FC<WrongChainDialogProps> = ({
  targetChain,
  ...rest
}) => {
  const switchChain = useSwitchChain();
  const toast = useToast();
  const [isPending, setPending] = useState(false);

  const handleChainSwitch = useCallback(async () => {
    setPending(true);
    try {
      await switchChain(targetChain!);
    } catch (err: any) {
      toast({
        title: typeof err === "string" ? err : err.message,
        status: "error",
        isClosable: true,
        duration: 7500,
      });
    } finally {
      setPending(false);
    }
  }, [targetChain, switchChain]);

  return (
    <Dialog title="Wrong chain" {...rest}>
      <Text textAlign="center">
        Change chain to <Tag>{targetChain?.name}</Tag> in order to preview this
        contract
      </Text>
      <Button
        onClick={handleChainSwitch}
        isLoading={isPending}
        isFullWidth
        mt="4"
      >
        Switch chain
      </Button>
    </Dialog>
  );
};

export default WrongChainDialog;
