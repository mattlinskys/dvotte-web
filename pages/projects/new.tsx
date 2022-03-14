import type { NextPage } from "next";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import { Heading } from "@chakra-ui/react";

const NewProjectPage: NextPage = () => (
  <PageLayout>
    <Panel maxW="lg" mx="auto" my="8">
      <Heading size="md" mb="4">
        Create project
      </Heading>
    </Panel>
  </PageLayout>
);

export default NewProjectPage;
