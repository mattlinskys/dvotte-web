import React, { useContext } from "react";
import useWalletConnected from "hooks/useWalletConnected";
import AuthenticateDialog from "components/AuthenticateDialog";
import { AuthContext } from "contexts/AuthContext";

const AuthenticateDialogProvider: React.FC = () => {
  const isConnected = useWalletConnected();
  const { isInitializing, isAuthenticated } = useContext(AuthContext);

  return (
    <AuthenticateDialog
      isOpen={isConnected && !isInitializing && !isAuthenticated}
    />
  );
};

export default AuthenticateDialogProvider;
