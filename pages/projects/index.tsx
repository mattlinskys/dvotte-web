import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";

const ProjectsPage: NextPage = () => <PageLayout>Projects</PageLayout>;

export const getStaticProps = makeGetServerSideTranslationsProps("projects");

export default ProjectsPage;
