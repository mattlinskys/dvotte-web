import type { NextPage } from "next";
import ErrorLayout from "components/ErrorLayout";
import { makeGetServerSideTranslationsProps } from "utils/ssrUtils";

const ErrorPage: NextPage = () => (
  <ErrorLayout message="Something went wrong" />
);

export const getStaticProps = makeGetServerSideTranslationsProps();

export default ErrorPage;
