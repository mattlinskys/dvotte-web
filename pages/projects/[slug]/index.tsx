import type { NextPage } from "next";
import { makeGetServerSideProjectProps } from "utils/ssrUtils";
import type { IProject } from "types/project";
import Head from "next/head";
import PageLayout from "components/PageLayout";
import { Box, extendTheme, ThemeProvider } from "@chakra-ui/react";
import { theme } from "config/theme";
import { useMemo } from "react";
import { PROJECT_WRAPPER_ID } from "constants/dom";
import DOMPurify from "isomorphic-dompurify";

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
            {project.content && (
              <Box
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(project.content, {
                    USE_PROFILES: { html: true },
                  }),
                }}
              />
            )}
          </Box>
        </ThemeProvider>
      </PageLayout>
    </>
  );
};

export const getServerSideProps = makeGetServerSideProjectProps();

export default ProjectPage;
