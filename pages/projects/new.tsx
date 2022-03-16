import type { NextPage } from "next";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";
import CreateProjectForm from "components/CreateProjectForm";

const NewProjectPage: NextPage = () => (
  <PageLayout>
    <Panel maxW="lg" w="full" mx="auto" my="8">
      <Heading size="md" mb="4">
        Create project
      </Heading>
      <CreateProjectForm />
    </Panel>
  </PageLayout>
);

export default NewProjectPage;
