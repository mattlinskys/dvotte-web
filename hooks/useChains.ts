import { useContext } from "react";
import { ChainsContext } from "contexts/ChainsContext";

const useChains = () => {
  const { chains } = useContext(ChainsContext);
  return chains;
};

export default useChains;
