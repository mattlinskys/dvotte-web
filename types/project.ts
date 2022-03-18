export interface IProject {
  id: string;
  title: string;
  slug: string;
  bannerUrl: string;
  description?: string;
  content?: string;
  color: string;
  contracts: { address: string; chainId: number }[];
  ownerAddress: string;
}

export interface ICreateProjectDto
  extends Pick<
    IProject,
    "title" | "slug" | "description" | "content" | "color" | "contracts"
  > {}
