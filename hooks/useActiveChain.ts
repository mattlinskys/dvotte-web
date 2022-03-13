import useChains from "hooks/useChains";
import { useWeb3React } from "@web3-react/core";

const useActiveChain = () => {
  const chains = useChains();
  const { chainId } = useWeb3React();
  return chains.find(({ id }) => id === chainId);
};

export default useActiveChain;
