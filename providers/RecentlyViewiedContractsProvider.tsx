import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  RecentlyViewiedContractsContext,
  RecentlyViewiedContractsContextValue,
} from "contexts/RecentlyViewiedContractsContext";
import { RECENTLY_VIEWED_CONTRACTS_KEY } from "constants/storage";
import useChains from "hooks/useChains";
import { isAddress } from "ethers/lib/utils";
import { IContract } from "types/contract";
import { compareAddresses } from "utils/addressUtils";

interface RecentlyViewiedContractsProviderProps {
  maxCount?: number;
}

const RecentlyViewiedContractsProvider: React.FC<
  RecentlyViewiedContractsProviderProps
> = ({ maxCount = 100, children }) => {
  const [contracts, setContracts] = useState<IContract[]>();
  const chains = useChains();

  useEffect(() => {
    try {
      const contractsRaw = JSON.parse(
        localStorage.getItem(RECENTLY_VIEWED_CONTRACTS_KEY)!
      ) as IContract[];
      const contracts = contractsRaw.filter(
        ({ address, chainId }) =>
          isAddress(address) && !!chains.some(({ id }) => id === chainId)
      );

      setContracts(contracts);
    } catch {}
  }, [chains]);

  const addContract = useCallback(
    (contract: IContract) => {
      if (!contracts) {
        return;
      }

      const newContracts = [
        contract,
        ...contracts.filter(
          ({ address, chainId }) =>
            !(
              compareAddresses(address, contract.address) &&
              chainId === contract.chainId
            )
        ),
      ].slice(0, maxCount);

      setContracts(newContracts);
      localStorage.setItem(
        RECENTLY_VIEWED_CONTRACTS_KEY,
        JSON.stringify(newContracts)
      );
    },
    [contracts, maxCount]
  );

  const value = useMemo<RecentlyViewiedContractsContextValue>(
    () => ({
      contracts,
      addContract,
    }),
    [contracts, addContract]
  );

  return (
    <RecentlyViewiedContractsContext.Provider value={value}>
      {children}
    </RecentlyViewiedContractsContext.Provider>
  );
};

export default RecentlyViewiedContractsProvider;
