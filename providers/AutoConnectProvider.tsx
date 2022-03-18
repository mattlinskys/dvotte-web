import React, { useEffect, useMemo, useState } from "react";
import {
  AutoConnectContext,
  AutoConnectContextValue,
} from "contexts/AutoConnectContext";
import { injected } from "connectors/injected";
import { useWeb3React } from "@web3-react/core";
import useWeb3ErrorToast from "hooks/useWeb3ErrorToast";

const AutoConnectProvider: React.FC = ({ children }) => {
  const { activate } = useWeb3React();
  const [isAutoConnecting, setAutoConnecting] = useState<boolean>();

  useEffect(() => {
    (async () => {
      try {
        setAutoConnecting(true);
        const isAuthorized = await injected.isAuthorized();
        if (isAuthorized) {
          await activate(injected);
        }
      } finally {
        setAutoConnecting(false);
      }
    })();
  }, []);
  useWeb3ErrorToast();

  const value = useMemo<AutoConnectContextValue>(
    () => ({
      isAutoConnecting,
    }),
    [isAutoConnecting]
  );

  return (
    <AutoConnectContext.Provider value={value}>
      {children}
    </AutoConnectContext.Provider>
  );
};

export default AutoConnectProvider;
