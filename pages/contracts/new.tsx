import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import DeployContractForm from "components/DeployContractForm";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";
import useConnected from "hooks/useConnected";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import { AutoConnectContext } from "contexts/AutoConnectContext";
import { useContext } from "react";

const NewContractPage: NextPage = () => {
  const { isAutoConnecting } = useContext(AutoConnectContext);
  const isConnected = useConnected();

  return (
    <>
      <PageLayout titleKey="contracts:deploy-contract">
        <Panel maxW="md" w="full" mx="auto" my="8">
          <Heading size="md" mb="4">
            Deploy contract
          </Heading>
          <DeployContractForm onDeployed={() => {}} />
        </Panel>
      </PageLayout>

      <ConnectWalletDialog
        isOpen={isAutoConnecting === false && !isConnected}
      />
    </>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("contracts");

export default NewContractPage;
