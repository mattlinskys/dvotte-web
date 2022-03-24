import { useWeb3React } from "@web3-react/core";

const useWalletConnected = () => {
  const { active: isConnected } = useWeb3React();
  return isConnected;
};

export default useWalletConnected;
