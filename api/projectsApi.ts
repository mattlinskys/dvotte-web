import axios, { AxiosRequestConfig } from "axios";
import { IMultiResults } from "types/api";
import type {
  ICreateProjectDto,
  IDevote,
  IDevoteDto,
  IProject,
  IUpdateProjectDto,
} from "types/project";

export const createProject = (
  data: ICreateProjectDto,
  config?: AxiosRequestConfig<any>
) => axios.post<IProject>("/projects", data, config);

export const updateProject = (
  id: string,
  data: IUpdateProjectDto,
  config?: AxiosRequestConfig<any>
) => axios.put<IProject>(`/projects/${id}`, data, config);

export const uploadProjectBanner = (id: string, data: FormData) =>
  axios.post<IProject>(`/projects/${id}/upload-banner`, data);

export const getProjectBySlug = (
  slug: string,
  config?: AxiosRequestConfig<any>
) => axios.get<IProject>(`/projects/${slug}/slug`, config);

export const registerDevote = (id: string, data: IDevoteDto) =>
  axios.post<IDevote>(`/projects/${id}/devotes`, data);

export const getProjectDevotes = (id: string, offset: number, limit: number) =>
  axios.get<IMultiResults<IDevote>>(`/projects/${id}/devotes`, {
    params: { offset, limit },
  });
