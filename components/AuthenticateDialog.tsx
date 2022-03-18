import React, { useContext } from "react";
import Dialog, { DialogProps } from "components/Dialog";
import { AuthContext } from "contexts/AuthContext";
import { Button } from "@chakra-ui/react";

interface AuthenticateDialogProps extends Omit<DialogProps, "title"> {}

const AuthenticateDialog: React.FC<AuthenticateDialogProps> = (props) => {
  const { authenticate } = useContext(AuthContext);

  return (
    <Dialog title="Sign in with wallet" {...props}>
      <Button isFullWidth onClick={() => authenticate()}>
        Click to sign in with wallet
      </Button>
    </Dialog>
  );
};

export default AuthenticateDialog;
