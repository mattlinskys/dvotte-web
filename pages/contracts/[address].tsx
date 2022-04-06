import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import { useRouter } from "next/router";
import useChains from "hooks/useChains";
import { providers, utils } from "ethers";
import { useCallback, useContext, useEffect, useMemo } from "react";
import useWalletConnected from "hooks/useWalletConnected";
import ErrorLayout from "components/ErrorLayout";
import { RecentlyViewiedContractsContext } from "contexts/RecentlyViewiedContractsContext";
import WrongChainDialogProvider from "providers/WrongChainDialogProvider";
import ConnectWalletDialogProvider from "providers/ConnectWalletDialogProvider";
import type { IChain } from "types/chain";
import SelectChainDialog from "components/SelectChainDialog";

const ContractPage: NextPage = () => {
  const { query, replace } = useRouter();
  const chains = useChains();
  const address = utils.isAddress(query.address as string)
    ? utils.getAddress(query.address as string)
    : undefined;
  const chain = useMemo(
    () => chains.find(({ id }) => id.toString() === (query.chainId as string)),
    [chains, query.chainId]
  );
  const isConnected = useWalletConnected();
  const { contracts, addContract } = useContext(
    RecentlyViewiedContractsContext
  );

  const handleSelectChain = useCallback(
    ({ id }: IChain) => {
      replace({ query: { ...query, chainId: id } });
    },
    [query, replace]
  );

  useEffect(() => {
    if (!address || !chain) {
      return;
    }

    const [rpc] = chain.rpcUrls;
    const provider = new providers.JsonRpcProvider(
      rpc.replace("${INFURA_API_KEY}", process.env.NEXT_PUBLIC_INFURA_API_KEY)
    );
    provider
      .getBlockNumber()
      .then((block) => {
        console.log("Got Block", block);
      })
      .catch(console.log);
  }, [address, chain]);

  useEffect(() => {
    if (address && chain && contracts) {
      addContract({ address, chainId: chain.id });
    }
  }, [address, chain, !!contracts]);

  return address ? (
    <>
      <PageLayout title={address}>
        <p>
          Contract {address} {chain?.id}
        </p>
      </PageLayout>

      <WrongChainDialogProvider chainId={query.chainId as string} />
      <ConnectWalletDialogProvider />
      <SelectChainDialog
        isOpen={isConnected && !!address && !chain}
        onSelectChain={handleSelectChain}
        description="Chain parameter is missing, please select what chain you want to use for this contract"
      />
    </>
  ) : (
    <ErrorLayout message="Invalid address" />
  );
};

export const getServerSideProps =
  makeGetServerSideTranslationsProps("contracts");

export default ContractPage;
