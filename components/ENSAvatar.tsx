import React from "react";
import useENSAvatar from "hooks/useENSAvatar";
import { Avatar, AvatarProps } from "@chakra-ui/react";

export interface ENSAvatarProps extends Omit<AvatarProps, "src"> {
  addressOrName: string;
}

const ENSAvatar: React.FC<ENSAvatarProps> = ({ addressOrName, ...rest }) => {
  const avatarUrl = useENSAvatar(addressOrName);

  return <Avatar src={avatarUrl || undefined} {...rest} />;
};

export default ENSAvatar;
