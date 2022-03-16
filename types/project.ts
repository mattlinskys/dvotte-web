export interface IProject {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  color: string;
  ownerAddress: string;
}

export interface ICreateProjectDto {
  slug: string;
  title: string;
  description?: string;
  content?: string;
  color: string;
  contractIds: string[];
}
