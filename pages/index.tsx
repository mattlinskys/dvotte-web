import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import PageLayout from "components/PageLayout";

const HomePage: NextPage = (props) => (
  <PageLayout>
    <Link href="/contracts/new">Deploy new contract</Link>
    {JSON.stringify(props)}
  </PageLayout>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["meta", "common"])),
  },
});

export default HomePage;
