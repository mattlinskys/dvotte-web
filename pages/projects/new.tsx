import { useCallback, useContext } from "react";
import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import { Heading, useToast } from "@chakra-ui/react";
import ProjectForm from "components/ProjectForm";
import { useTranslation } from "next-i18next";
import ConnectWalletDialogProvider from "providers/ConnectWalletDialogProvider";
import AuthenticateDialogProvider from "providers/AuthenticateDialogProvider";
import { useRouter } from "next/router";
import { IProject } from "types/project";

const NewProjectPage: NextPage = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const toast = useToast();

  const handleSaved = useCallback(
    (project: IProject) => {
      toast({
        title: "Created successfully!",
        status: "success",
        isClosable: true,
        duration: 7_000,
      });
      push({
        pathname: "/projects/[slug]",
        query: { slug: project.slug },
      });
    },
    [toast, push]
  );

  return (
    <>
      <PageLayout titleKey="projects:new-project">
        <Panel maxW="lg" w="full" mx="auto" my="8">
          <Heading size="md" mb="4">
            {t("projects:new-project")}
          </Heading>
          <ProjectForm onSaved={handleSaved} />
        </Panel>
      </PageLayout>

      <ConnectWalletDialogProvider />
      <AuthenticateDialogProvider />
    </>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("projects");

export default NewProjectPage;
