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

export enum SocialType {
  Discord = "discord",
  Twitter = "twitter",
  Telegram = "telegram",
  Medium = "medium",
}
