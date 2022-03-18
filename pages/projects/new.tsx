import { useContext } from "react";
import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";
import CreateProjectForm from "components/CreateProjectForm";
import { useTranslation } from "next-i18next";
import { AuthContext } from "contexts/AuthContext";
import useConnected from "hooks/useConnected";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import AuthenticateDialog from "components/AuthenticateDialog";
import { AutoConnectContext } from "contexts/AutoConnectContext";

const NewProjectPage: NextPage = () => {
  const { t } = useTranslation();
  const isConnected = useConnected();
  const { isAutoConnecting } = useContext(AutoConnectContext);
  const { isInitializing, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <PageLayout titleKey="projects:new-project">
        <Panel maxW="lg" w="full" mx="auto" my="8">
          <Heading size="md" mb="4">
            {t("projects:new-project")}
          </Heading>
          <CreateProjectForm />
        </Panel>
      </PageLayout>

      <ConnectWalletDialog
        isOpen={isAutoConnecting === false && !isConnected}
      />
      <AuthenticateDialog
        isOpen={isConnected && !isInitializing && !isAuthenticated}
      />
    </>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("projects");

export default NewProjectPage;
