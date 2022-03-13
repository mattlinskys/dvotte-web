import axios, { AxiosRequestConfig } from "axios";
import type { IProject } from "types/project";

export const getProjectBySlug = (
  slug: string,
  config?: AxiosRequestConfig<any>
) => axios.get<IProject>(`/projects/${slug}/slog`, config);
