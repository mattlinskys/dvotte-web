import type { NextPage } from "next";
import { makeGetServerSideProjectProps } from "utils/ssrUtils";
import type { IProject } from "types/project";
import Head from "next/head";
import PageLayout from "components/PageLayout";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  ListItem,
  Spinner,
  Text,
  ThemeProvider,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { PROJECT_WRAPPER_ID } from "constants/dom";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/router";
import useChains from "hooks/useChains";
import ProjectDevotesList from "components/ProjectDevotesList";
import { IChain } from "types/chain";
import Panel from "components/Panel";
import DevoteForm from "components/DevoteForm";
import dvotteContract from "contracts/DVotte.json";
import useContractReads from "hooks/useContractReads";
import useJsonRpcProvider from "hooks/useJsonRpcProvider";
import { Contract } from "ethers";
import useProjectTheme from "hooks/useProjectTheme";
import { shortenAddress } from "utils/addressUtils";
import useContractDeployed from "hooks/useContractDeployed";
import { socialTypeToIcon } from "config/socials";

interface ProjectPageProps {
  project: IProject;
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const chains = useChains();
  const { query, replace } = useRouter();
  const selectedChainIdParam =
    query.chainId && parseInt(query.chainId as string);
  const projectChains = useMemo(
    () =>
      project.contracts
        .map(({ chainId }) => chains.find(({ id }) => id === chainId))
        .filter((chain) => !!chain) as IChain[],
    [project.contracts, chains]
  );
  const selectedChain = useMemo(
    () =>
      (selectedChainIdParam &&
        projectChains.find(({ id }) => id === selectedChainIdParam)) ||
      projectChains[0],
    [selectedChainIdParam, projectChains]
  );
  const selectedContract = useMemo(
    () =>
      project.contracts.find(({ chainId }) => chainId === selectedChain.id)!,
    [project.contracts, selectedChain.id]
  );
  const projectTheme = useProjectTheme(project);

  const provider = useJsonRpcProvider(selectedChain.rpcUrls[0]);
  const contract = useMemo(
    () => new Contract(selectedContract.address, dvotteContract.abi, provider),
    [selectedContract.address, provider]
  );
  const isContractDeployed = useContractDeployed(contract);
  const [members] = useContractReads<[string[]]>({
    reads: isContractDeployed
      ? [
          {
            method: "getMembers",
          },
        ]
      : [],
    contract,
  });

  return (
    <>
      <Head>
        {project.description && (
          <meta name="description" content={project.description} />
        )}
      </Head>

      <PageLayout title={project.title}>
        <ThemeProvider
          theme={projectTheme}
          cssVarsRoot={`#${PROJECT_WRAPPER_ID}`}
        >
          <Box id={PROJECT_WRAPPER_ID}>
            {project.bannerUrl && (
              <AspectRatio
                ratio={{ base: 2 / 1, md: 3 / 1, lg: 4 / 1 }}
                mb="-24"
                zIndex={-1}
              >
                <Image
                  src={project.bannerUrl}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
              </AspectRatio>
            )}
            <Container display="flex" my="12">
              <VStack w="full" spacing="4" align="stretch" overflow="hidden">
                <Panel>
                  <Heading fontSize="2xl" fontWeight="semibold">
                    {project.title}
                  </Heading>
                  {project.description && (
                    <Text mt="2" lineHeight="1.25">
                      {project.description}
                    </Text>
                  )}
                  {project.socials.length > 0 && (
                    <>
                      <Divider my="3" />
                      <HStack spacing="2">
                        {project.socials.map(({ type, url }) => (
                          // <IconButton
                          //   key={type}
                          //   as={Link}
                          //   href={url}
                          //   isExternal
                          //   minW="9"
                          //   h="9"
                          //   borderWidth="2px"
                          //   variant="outline"
                          //   colorScheme={type}
                          //   aria-label={type}
                          //   icon={
                          //     <Icon
                          //       as={socialTypeToIcon[type]}
                          //       w="6"
                          //       h="auto"
                          //     />
                          //   }
                          // />
                          <Button
                            key={type}
                            as={Link}
                            href={url}
                            isExternal
                            variant="outline"
                            size="sm"
                            colorScheme={type}
                            leftIcon={
                              <Icon
                                as={socialTypeToIcon[type]}
                                w="4"
                                h="auto"
                              />
                            }
                            textTransform="capitalize"
                          >
                            {type}
                          </Button>
                        ))}
                      </HStack>
                    </>
                  )}
                </Panel>

                <Panel>
                  {project.content && (
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(project.content, {
                          USE_PROFILES: { html: true },
                        }),
                      }}
                    />
                  )}
                </Panel>

                <Panel>
                  <ProjectDevotesList projectId={project.id} />
                </Panel>
              </VStack>

              <Box position="relative" w="full" maxW="xs" ml="5" flexShrink="0">
                <VStack
                  position="sticky"
                  top="calc(60px + 1rem)"
                  w="inherit"
                  maxW="inherit"
                  align="stretch"
                  spacing="4"
                >
                  <Panel>
                    <DevoteForm
                      projectId={project.id}
                      contract={selectedContract}
                      chains={projectChains}
                      selectedChainId={selectedChain.id}
                      onChangeChain={(chainId) => {
                        replace({
                          query: { ...query, chainId },
                        });
                      }}
                      isDisabled={!isContractDeployed}
                    />
                  </Panel>

                  <Panel label="Members">
                    {members ? (
                      <UnorderedList fontSize="sm">
                        {members.map((address) => (
                          <ListItem key={address}>
                            {selectedChain.blockExplorers?.[0] ? (
                              <Link
                                href={`${selectedChain.blockExplorers[0].url}/address/${address}`}
                                isExternal
                              >
                                {shortenAddress(address, 12)}
                              </Link>
                            ) : (
                              shortenAddress(address, 12)
                            )}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    ) : (
                      <Spinner display="block" mx="auto" opacity="0.6" />
                    )}
                  </Panel>
                </VStack>
              </Box>
            </Container>
          </Box>
        </ThemeProvider>
      </PageLayout>
    </>
  );
};

export const getServerSideProps = makeGetServerSideProjectProps();

export default ProjectPage;
