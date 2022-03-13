import { useWeb3React } from "@web3-react/core";
import { providers } from "ethers";

const useLibrary = () => {
  const { library } = useWeb3React();
  return library as providers.Web3Provider | undefined;
};

export default useLibrary;
