import React, { useCallback, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  HStack,
  Tag,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteProject } from "api/projectsApi";
import type { IProject } from "types/project";
import Dialog from "components/Dialog";

interface UserProjectsListItemProps {
  project: IProject;
  onDeleted: (id: IProject["id"]) => void;
}

const UserProjectsListItem: React.FC<UserProjectsListItemProps> = ({
  project: { id, slug, title },
  onDeleted,
}) => {
  const [isDeleting, setDeleting] = useState(false);
  const {
    isOpen: isConfirmDialogOpen,
    onOpen: onConfirmDialogOpen,
    onClose: onConfirmDialogClose,
  } = useDisclosure();

  const handleDelete = useCallback(async () => {
    setDeleting(true);

    try {
      await deleteProject(id);
      onDeleted(id);
    } catch (err) {
      console.error(err);
    }
  }, [id, onDeleted]);

  return (
    <>
      <Tr key={id}>
        <Td>{slug}</Td>
        <Td>{title}</Td>
        <Td isNumeric>
          <HStack>
            <Link
              href={{
                pathname: "/projects/[slug]",
                query: { slug },
              }}
              passHref
            >
              <Button as="a" isDisabled={isDeleting} variant="link" size="sm">
                Preview
              </Button>
            </Link>

            <Link
              href={{
                pathname: "/projects/[slug]/edit",
                query: { slug },
              }}
              passHref
            >
              <Button as="a" isDisabled={isDeleting} variant="link" size="sm">
                Edit
              </Button>
            </Link>

            <Button
              onClick={onConfirmDialogOpen}
              isLoading={isDeleting}
              variant="link"
              colorScheme="red"
              size="sm"
            >
              Delete
            </Button>
          </HStack>
        </Td>
      </Tr>

      <Dialog
        title="Are you sure?"
        isOpen={isConfirmDialogOpen}
        onClose={onConfirmDialogClose}
      >
        <Text>
          You're about to remove <Tag>{slug}</Tag> project.
        </Text>
        <HStack justify="flex-end" mt="4">
          <Button colorScheme="gray" onClick={onConfirmDialogClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Confirm
          </Button>
        </HStack>
      </Dialog>
    </>
  );
};

export default UserProjectsListItem;
