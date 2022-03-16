import axios, { AxiosRequestConfig } from "axios";
import type { ICreateProjectDto, IProject } from "types/project";

export const createProject = (
  data: ICreateProjectDto,
  config?: AxiosRequestConfig<any>
) => axios.post<IProject>("/projects", data, config);

export const getProjectBySlug = (
  slug: string,
  config?: AxiosRequestConfig<any>
) => axios.get<IProject>(`/projects/${slug}/slug`, config);
