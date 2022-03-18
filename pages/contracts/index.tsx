import type { NextPage } from "next";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";
import PageLayout from "components/PageLayout";

const ContractsPage: NextPage = () => <PageLayout>Contracts</PageLayout>;

export const getStaticProps = makeGetServerSideTranslationsProps("contracts");

export default ContractsPage;
