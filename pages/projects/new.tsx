import type { GetStaticProps, NextPage } from "next";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";
import CreateProjectForm from "components/CreateProjectForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const NewProjectPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout titleKey="projects:new-project">
      <Panel maxW="lg" w="full" mx="auto" my="8">
        <Heading size="md" mb="4">
          {t("projects:new-project")}
        </Heading>
        <CreateProjectForm />
      </Panel>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["meta", "common", "projects"])),
  },
});

export default NewProjectPage;
