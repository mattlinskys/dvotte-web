import type { NextPage } from "next";
import { getProjectBySlug } from "api/projectsApi";
import type { IProject } from "types/project";
import Head from "next/head";
import PageLayout from "components/PageLayout";

interface ProjectPageProps {
  project: IProject;
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  return (
    <>
      <Head>
        {project.description && (
          <meta name="description" content={project.description} />
        )}
      </Head>

      <PageLayout title={project.title}>
        <p>Project: {project.id}</p>
      </PageLayout>
    </>
  );
};

ProjectPage.getInitialProps = async (ctx) => {
  // TODO: 404
  const { data: project } = await getProjectBySlug(ctx.query.slug as string);
  return { project };
};

export default ProjectPage;
