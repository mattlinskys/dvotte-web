import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";
import { useRouter } from "next/router";
import useChains from "hooks/useChains";
import { utils } from "ethers";
import { useCallback, useMemo } from "react";
import useActiveChain from "hooks/useActiveChain";
import { Button, Tag, Text, VStack } from "@chakra-ui/react";
import Dialog from "components/Dialog";
import ConnectWalletDialog from "components/ConnectWalletDialog";
import useConnected from "hooks/useConnected";

const ContractPage: NextPage = () => {
  const { query, replace } = useRouter();
  const chains = useChains();
  const address = utils.isAddress(query.address as string)
    ? utils.getAddress(query.address as string)
    : undefined;
  const chain = useMemo(
    () => chains.find(({ id }) => id.toString() === (query.chainId as string)),
    [chains, query.chainId]
  );
  const activeChain = useActiveChain();
  const isConnected = useConnected();

  const handleSelectChain = useCallback(
    (chainId: number) => {
      replace({ query: { ...query, chainId } });
    },
    [query, replace]
  );

  // TODO: Switch chain handler

  return (
    <>
      <PageLayout>
        <p>
          Contract {address} {chain?.id}
        </p>
      </PageLayout>

      <Dialog
        isOpen={
          isConnected && !!chain && !!activeChain && chain.id !== activeChain.id
        }
        title="Wrong chain"
      >
        <Text textAlign="center">
          Change chain to <Tag>{chain?.name}</Tag> in order to use this contract
        </Text>
        <Button onClick={() => {}} isFullWidth mt="4">
          Switch chain
        </Button>
      </Dialog>

      <Dialog isOpen={isConnected && !!address && !chain} title="Select chain">
        <Text textAlign="center">
          Chain parameter is missing, please select what chain you want to use
          for this contract
        </Text>
        <VStack
          align="stretch"
          spacing="2"
          p="2"
          m="-2"
          mt="4"
          maxHeight="72"
          overflowY="auto"
        >
          {chains.map(({ id, name, nativeCurrency }) => (
            <Button
              key={id}
              onClick={() => handleSelectChain(id)}
              flexShrink="0"
            >
              {name}
              {nativeCurrency && ` (${nativeCurrency.symbol})`}
            </Button>
          ))}
        </VStack>
      </Dialog>

      <ConnectWalletDialog isOpen={!isConnected} />
    </>
  );
};

export const getStaticProps = makeGetServerSideTranslationsProps("contracts");

export default ContractPage;
