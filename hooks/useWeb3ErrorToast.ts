import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";

const useWeb3ErrorToast = () => {
  const { error } = useWeb3React();
  const toast = useToast();

  useEffect(() => {
    if (error && error.name !== "UserRejectedRequestError") {
      let title = error.message;

      if (error instanceof NoEthereumProviderError) {
        title = "No wallet browser extension found, please install MetaMask";
      }

      toast({
        title,
        status: "error",
        isClosable: true,
        duration: 10_000,
      });
    }
  }, [error]);
};

export default useWeb3ErrorToast;
