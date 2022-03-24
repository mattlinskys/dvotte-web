import React, { useCallback, useContext } from "react";
import Dialog, { DialogProps } from "components/Dialog";
import { AuthContext } from "contexts/AuthContext";
import { Button, Icon, useToast, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface AuthenticateDialogProps extends Omit<DialogProps, "title"> {}

const AuthenticateDialog: React.FC<AuthenticateDialogProps> = (props) => {
  const { authenticate } = useContext(AuthContext);
  const toast = useToast();

  const handleAuthenticateClick = useCallback(async () => {
    try {
      await authenticate();
    } catch (err: any) {
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        duration: 10_000,
      });
    }
  }, [authenticate]);

  return (
    <Dialog title="Sign in with wallet" {...props}>
      <VStack spacing="4" align="stretch">
        <Button onClick={handleAuthenticateClick}>
          Click to sign in with wallet
        </Button>

        <Link href="/projects" passHref>
          <Button
            as="a"
            variant="outline"
            leftIcon={<Icon as={ArrowBackIcon} />}
          >
            Bo Back
          </Button>
        </Link>
      </VStack>
    </Dialog>
  );
};

export default AuthenticateDialog;
