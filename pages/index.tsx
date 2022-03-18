import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";

const HomePage: NextPage = () => <PageLayout>Home page</PageLayout>;

export const getStaticProps = makeGetServerSideTranslationsProps();

export default HomePage;
