import { useEffect } from "react";
import ethers from "ethers";
import type { IProject } from "types/project";
import useChains from "hooks/useChains";
import dvotteContract from "contracts/DVotte.json";

const useProjectContractBalances = (project: Pick<IProject, "contracts">) => {
  const chains = useChains();

  useEffect(() => {
    const fetchBalances = async () => {
      const contractChains = project.contracts.map(
        ({ chainId }) => chains.find(({ id }) => id === chainId)!
      );
      const providers = project.contracts.map(
        (_, i) =>
          new ethers.providers.JsonRpcProvider(
            contractChains[i].rpcUrls[0].replace(
              "${INFURA_API_KEY}",
              process.env.NEXT_PUBLIC_INFURA_API_KEY
            )
          )
      );
      const contracts = providers.map(
        (provider, i) =>
          new ethers.Contract(
            project.contracts[i].address,
            dvotteContract.abi,
            provider
          )
      );
      const results = await Promise.all(
        contracts.map((contract) => contract.functions.totalBalance())
      );
      console.log(results);
    };

    fetchBalances();
  }, [project.contracts, chains]);
};

export default useProjectContractBalances;
