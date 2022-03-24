import type { NextPage } from "next";
import { makeGetServerSideProjectProps } from "utils/ssrUtils";
import type { IProject } from "types/project";
import PageLayout from "components/PageLayout";
import { Heading, useToast } from "@chakra-ui/react";
import Panel from "components/Panel";
import CreateProjectForm from "components/CreateProjectForm";
import { useTranslation } from "next-i18next";
import useAccountAddress from "hooks/useAccountAddress";
import UnauthorizedProjectDialog from "components/UnauthorizedProjectDialog";
import ConnectWalletDialogProvider from "providers/ConnectWalletDialogProvider";
import AuthenticateDialogProvider from "providers/AuthenticateDialogProvider";
import { useCallback } from "react";

interface EditProjectPageProps {
  project: IProject;
}

const EditProjectPage: NextPage<EditProjectPageProps> = ({ project }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const account = useAccountAddress();

  const handleSaved = useCallback(
    (project: IProject) => {
      toast({
        title: "Saved successfully!",
        status: "success",
        isClosable: true,
        duration: 7_000,
      });
    },
    [toast]
  );

  return (
    <>
      <PageLayout titleKey="projects:new-project">
        <Panel maxW="lg" w="full" mx="auto" my="8">
          <Heading size="md" mb="4">
            {t("projects:edit-project")}
          </Heading>
          <CreateProjectForm project={project} onSaved={handleSaved} />
        </Panel>
      </PageLayout>

      <ConnectWalletDialogProvider />
      <AuthenticateDialogProvider />
      <UnauthorizedProjectDialog
        isOpen={!!account && account !== project.ownerAddress}
        project={project}
      />
    </>
  );
};

export const getServerSideProps = makeGetServerSideProjectProps();

export default EditProjectPage;
