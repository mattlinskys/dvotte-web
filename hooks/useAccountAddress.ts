import { useWeb3React } from "@web3-react/core";

const useAccountAddress = () => {
  const { account } = useWeb3React();
  return account;
};

export default useAccountAddress;
