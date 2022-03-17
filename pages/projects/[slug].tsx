import type { GetServerSideProps, NextPage } from "next";
import { getProjectBySlug } from "api/projectsApi";
import type { IProject } from "types/project";
import Head from "next/head";
import PageLayout from "components/PageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AxiosError } from "axios";
import { Box, extendTheme, ThemeProvider } from "@chakra-ui/react";
import { theme } from "config/theme";
import { useMemo } from "react";
import { PROJECT_WRAPPER_ID } from "constants/dom";

interface ProjectPageProps {
  project: IProject;
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const projectTheme = useMemo(
    () => extendTheme(theme, { colors: { brand: { 500: project.color } } }),
    [project.color]
  );

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
            <p>Project: {project.id}</p>
          </Box>
        </ThemeProvider>
      </PageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query: { slug },
}) => {
  let project;

  try {
    const { data } = await getProjectBySlug(slug as string);
    project = data;
  } catch (err) {
    if ((err as AxiosError).response?.status !== 404) {
      throw err;
    }
  }

  return project
    ? {
        props: {
          ...(await serverSideTranslations(locale!, ["common", "meta"])),
          project,
        },
      }
    : {
        notFound: true,
      };
};

export default ProjectPage;
