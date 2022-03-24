import { useContext } from "react";
import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import Panel from "components/Panel";
import { Button, Divider, Heading, VStack } from "@chakra-ui/react";
import { RecentlyViewiedContractsContext } from "contexts/RecentlyViewiedContractsContext";
import Link from "next/link";
import ContractForm from "components/ContractForm";
import { useRouter } from "next/router";

const ContractsPage: NextPage = () => {
  const router = useRouter();
  const { contracts } = useContext(RecentlyViewiedContractsContext);

  return (
    <PageLayout>
      <Panel maxW="md" w="full" mx="auto" my="8">
        <VStack spacing="6" align="stretch">
          {contracts && contracts.length > 0 && (
            <VStack spacing="4" align="stretch">
              <Heading size="md">Recently viewed contracts</Heading>
              <ul>
                {contracts!.map(({ address, chainId }) => (
                  <li key={`${address}-${chainId}`}>
                    <Link
                      href={{
                        pathname: "/contracts/[address]",
                        query: { address, chainId },
                      }}
                    >
                      <a>
                        {address} ({chainId})
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </VStack>
          )}

          <VStack spacing="4" align="stretch">
            <Heading size="md">Preview contract</Heading>
            <ContractForm
              onSubmit={(query) => {
                router.push({
                  pathname: "/contracts/[address]",
                  query,
                });
              }}
            />
          </VStack>
          <Divider />

          <Link href="/contracts/new" passHref>
            <Button as="a">Deploy new contract</Button>
          </Link>
        </VStack>
      </Panel>
    </PageLayout>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("contracts");

export default ContractsPage;
