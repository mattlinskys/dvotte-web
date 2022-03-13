import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Head from "next/head";
import { useTranslation } from "next-i18next";

interface PageLayoutProps {
  title?: string;
  titleKey?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  titleKey,
  children,
}) => {
  const { t } = useTranslation("meta");

  return (
    <>
      <Head>
        <title>
          {title || titleKey
            ? `${t("title")} | ${title || t(titleKey!)}`
            : t("title")}
        </title>
      </Head>

      <Header />
      <div style={{ margin: "1rem" }}>{children}</div>
      <Footer />
    </>
  );
};

export default PageLayout;
