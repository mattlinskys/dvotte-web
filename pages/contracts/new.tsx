import type { GetStaticProps, NextPage } from "next";
import PageLayout from "components/PageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DeployContractForm from "components/DeployContractForm";
import useConnected from "hooks/useConnected";
import { Box } from "@chakra-ui/react";

const NewContractPage: NextPage = () => {
  const isConnected = useConnected();

  return (
    <PageLayout titleKey="contracts:deploy-contract">
      {isConnected && (
        <Box
          maxW="md"
          m="4"
          p="4"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.300"
          rounded="md"
        >
          <DeployContractForm onDeployed={() => {}} />
        </Box>
      )}
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["meta", "common", "contracts"])),
  },
});

export default NewContractPage;
