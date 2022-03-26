import { useEffect, useState } from "react";
import { Contract } from "ethers";

const useContractDeployed = (contract?: Contract) => {
  const [isDeployed, setDeployed] = useState<boolean | null>(null);

  useEffect(() => {
    setDeployed(null);

    if (contract) {
      (async () => {
        try {
          await contract.deployed();
          setDeployed(true);
        } catch (err) {
          setDeployed(false);
          console.error(err);
        }
      })();
    }
  }, [contract]);

  return isDeployed;
};

export default useContractDeployed;
