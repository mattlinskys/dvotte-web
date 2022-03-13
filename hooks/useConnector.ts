import { useWeb3React } from "@web3-react/core";

const useConnector = () => {
  const { connector } = useWeb3React();
  return connector;
};

export default useConnector;
