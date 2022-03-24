import React from "react";
import Dialog, { DialogProps } from "components/Dialog";
import { Button, Icon, Tag, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IProject } from "types/project";

interface UnauthorizedProjectDialogProps extends Omit<DialogProps, "title"> {
  project: Pick<IProject, "ownerAddress" | "slug">;
}

const UnauthorizedProjectDialog: React.FC<UnauthorizedProjectDialogProps> = ({
  project,
  ...rest
}) => {
  return (
    <Dialog title="Not authorized" {...rest}>
      <Text textAlign="center">
        You're not the owner of this project, please switch to an account with
        this address:
        <Tag>{project.ownerAddress}</Tag>
      </Text>

      <Link
        href={{
          pathname: "/projects/[slug]",
          query: { slug: project.slug },
        }}
        passHref
      >
        <Button
          as="a"
          mt="6"
          variant="outline"
          leftIcon={<Icon as={ArrowBackIcon} />}
          isFullWidth
        >
          Go Back
        </Button>
      </Link>
    </Dialog>
  );
};

export default UnauthorizedProjectDialog;
