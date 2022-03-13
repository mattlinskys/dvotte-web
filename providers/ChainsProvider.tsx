import React, { useMemo } from "react";
import { ChainsContext, ChainsContextValue } from "contexts/ChainsContext";
import { defaultSupportedChains } from "config/chains";

const ChainsProvider: React.FC = ({ children }) => {
  const value = useMemo<ChainsContextValue>(
    () => ({
      chains: [...defaultSupportedChains],
    }),
    []
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};

export default ChainsProvider;
