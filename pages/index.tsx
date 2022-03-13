import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageLayout from "components/PageLayout";

const HomePage: NextPage = () => <PageLayout>Home page</PageLayout>;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "meta"])),
  },
});

export default HomePage;
