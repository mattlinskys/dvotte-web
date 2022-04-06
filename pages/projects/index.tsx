import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import UserProjectsList from "components/UserProjectsList";
import ConnectWalletDialogProvider from "providers/ConnectWalletDialogProvider";
import AuthenticateDialogProvider from "providers/AuthenticateDialogProvider";
import useWalletConnected from "hooks/useWalletConnected";
import { Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";

const ProjectsPage: NextPage = () => {
  const isConnected = useWalletConnected();

  return (
    <>
      <PageLayout title="Projects">
        {isConnected && (
          <Panel label="Your projects" w="full" maxW="2xl" mx="auto" my="8">
            <UserProjectsList />
            <Link href="/projects/new" passHref>
              <Button
                as="a"
                mt="4"
                isFullWidth
                leftIcon={<Icon as={AddIcon} />}
              >
                Create new project
              </Button>
            </Link>
          </Panel>
        )}
      </PageLayout>

      <ConnectWalletDialogProvider />
      <AuthenticateDialogProvider />
    </>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("projects");

export default ProjectsPage;
