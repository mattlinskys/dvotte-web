import { IContract } from "types/contract";

export interface IProject {
  id: string;
  title: string;
  slug: string;
  bannerUrl: string;
  description?: string;
  content?: string;
  color: string;
  contracts: IContract[];
  socials: { type: SocialType; url: string }[];
  ownerAddress: string;
}

export interface ICreateProjectDto
  extends Pick<
    IProject,
    | "title"
    | "slug"
    | "description"
    | "content"
    | "color"
    | "contracts"
    | "socials"
  > {}

export interface IUpdateProjectDto extends Omit<ICreateProjectDto, "slug"> {}

export interface IDevoteDto {
  chainId: number;
  transactionHash: string;
  note: string;
}

export enum SocialType {
  Twitter = "twitter",
  Telegram = "telegram",
  Discord = "discord",
  Medium = "medium",
}

export interface IDevote {
  id: string;
  transactionHash: string;
  contract: IContract;
  from: string;
  value: string;
  content: string;
  createdAt: string;
}
