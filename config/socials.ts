import { SocialType } from "types/project";
import { IconType } from "react-icons";
import { RiTwitterFill as Twitter } from "react-icons/ri";
import {
  FaTelegramPlane as Telegram,
  FaDiscord as Discord,
} from "react-icons/fa";
import { BsMedium as Medium } from "react-icons/bs";

export const socialTypeToIcon: Record<SocialType, IconType> = {
  [SocialType.Twitter]: Twitter,
  [SocialType.Telegram]: Telegram,
  [SocialType.Discord]: Discord,
  [SocialType.Medium]: Medium,
};
