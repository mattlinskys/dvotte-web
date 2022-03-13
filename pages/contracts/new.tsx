import type { GetStaticProps, NextPage } from "next";
import PageLayout from "components/PageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const NewContractPage: NextPage = () => (
  <PageLayout titleKey="contracts:deploy-contract">New contract</PageLayout>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["meta", "common", "contracts"])),
  },
});

export default NewContractPage;
