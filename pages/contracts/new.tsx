import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "components/PageLayout";
import DeployContractForm from "components/DeployContractForm";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";
import useConnected from "hooks/useConnected";
import ConnectWalletDialog from "components/ConnectWalletDialog";

const NewContractPage: NextPage = () => {
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

      <ConnectWalletDialog isOpen={!isConnected} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["meta", "common", "contracts"])),
  },
});

export default NewContractPage;
