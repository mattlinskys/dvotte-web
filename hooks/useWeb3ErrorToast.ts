import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

const useWeb3ErrorToast = () => {
  const { error } = useWeb3React();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 10_000,
      });
    }
  }, [error]);
};

export default useWeb3ErrorToast;
