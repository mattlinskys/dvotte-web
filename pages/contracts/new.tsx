import { useCallback, useContext } from "react";
import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import DeployContractForm from "components/DeployContractForm";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";
import useWalletConnected from "hooks/useWalletConnected";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import { AutoConnectContext } from "contexts/AutoConnectContext";
import { RecentlyViewiedContractsContext } from "contexts/RecentlyViewiedContractsContext";
import { useRouter } from "next/router";
import useActiveChain from "hooks/useActiveChain";
import type { Contract } from "ethers";
import UnsupportedChainDialog from "components/UnsupportedChainDialog";

const NewContractPage: NextPage = () => {
  const { isAutoConnecting } = useContext(AutoConnectContext);
  const isConnected = useWalletConnected();
  const activeChain = useActiveChain();
  const { addContract } = useContext(RecentlyViewiedContractsContext);
  const router = useRouter();

  // TODO: Success toast
  const handleDeployed = useCallback(
    ({ address }: Contract) => {
      const contract = {
        address,
        chainId: activeChain!.id,
      };

      addContract(contract);
      router.push({
        pathname: "/contracts/[address]",
        query: contract,
      });
    },
    [activeChain?.id, addContract, router.push]
  );

  return (
    <>
      <PageLayout titleKey="contracts:deploy-contract">
        <Panel maxW="md" w="full" mx="auto" my="8">
          <Heading size="md" mb="4">
            Deploy contract
          </Heading>
          <DeployContractForm onDeployed={handleDeployed} />
        </Panel>
      </PageLayout>

      <ConnectWalletDialog
        isOpen={isAutoConnecting === false && !isConnected}
      />
      <UnsupportedChainDialog isOpen={isConnected && !activeChain} />
    </>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("contracts");

export default NewContractPage;
