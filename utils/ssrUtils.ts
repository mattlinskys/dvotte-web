import { getProjectBySlug } from "api/projectsApi";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const makeGetServerSideTranslationsProps =
  (...namespaces: ("contracts" | "projects")[]): GetServerSideProps =>
  async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale!, [
        "meta",
        "common",
        ...namespaces,
      ])),
    },
  });

export const makeGetServerSideProjectProps =
  (): GetServerSideProps =>
  async ({ locale, query: { slug } }) => {
    let project;

    try {
      const { data } = await getProjectBySlug(slug as string);
      project = data;
    } catch (err) {
      if ((err as AxiosError).response?.status !== 404) {
        throw err;
      }
    }

    return project
      ? {
          props: {
            ...(await serverSideTranslations(locale!, [
              "common",
              "meta",
              "projects",
            ])),
            project,
          },
        }
      : {
          notFound: true,
        };
  };
