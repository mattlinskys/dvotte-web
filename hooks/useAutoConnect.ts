import { useWeb3React } from "@web3-react/core";
import { injected } from "connectors/injected";
import { useEffect } from "react";

const useAutoConnect = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    (async () => {
      const isAuthorized = await injected.isAuthorized();
      if (isAuthorized) {
        activate(injected);
      }
    })();
  }, []);
};

export default useAutoConnect;
