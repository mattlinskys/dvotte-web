import type { NextPage } from "next";
import ErrorLayout from "components/ErrorLayout";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";

const NotFoundPage: NextPage = () => <ErrorLayout message="Not found" />;

export const getStaticProps = makeGetServerSideTranslationsProps();

export default NotFoundPage;
