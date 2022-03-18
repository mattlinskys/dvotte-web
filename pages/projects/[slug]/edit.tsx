import type { NextPage } from "next";
import { makeGetServerSideProjectProps } from "utils/ssrUtils";
import type { IProject } from "types/project";
import PageLayout from "components/PageLayout";
import { Heading } from "@chakra-ui/react";
import Panel from "components/Panel";
import CreateProjectForm from "components/CreateProjectForm";
import { useTranslation } from "next-i18next";

interface EditProjectPageProps {
  project: IProject;
}

// TODO: Authorization (ownerAddress)
const EditProjectPage: NextPage<EditProjectPageProps> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <PageLayout titleKey="projects:new-project">
      <Panel maxW="lg" w="full" mx="auto" my="8">
        <Heading size="md" mb="4">
          {t("projects:edit-project")}
        </Heading>
        <CreateProjectForm project={project} />
      </Panel>
    </PageLayout>
  );
};

export const getServerSideProps = makeGetServerSideProjectProps();

export default EditProjectPage;
