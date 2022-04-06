import React, { useCallback, useEffect, useReducer, useState } from "react";
import useAccountAddress from "hooks/useAccountAddress";
import { IProject } from "types/project";
import { getProjects } from "api/projectsApi";
import { Spinner, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import UserProjectsListItem from "components/UserProjectsListItem";
import {
  createEntitiesReducer,
  entitiesDefaultState,
} from "reducers/entitiesReducer";
import type { AxiosError } from "axios";

const projectsReducer = createEntitiesReducer<IProject, "id", AxiosError>("id");

const UserProjectsList: React.FC = () => {
  const accountAddress = useAccountAddress();
  const [{ entities: projects, isFetched, fetchError }, dispatch] = useReducer(
    projectsReducer,
    entitiesDefaultState
  );

  const handleDeleted = useCallback(
    (id: IProject["id"]) => {
      dispatch({ type: "remove", id });
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        dispatch({ type: "fetch-pending" });
        const { data } = await getProjects();
        dispatch({ type: "fetch-fulfilled", entities: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "fetch-rejected", error: err as AxiosError });
      }
    };

    fetchProjects();
  }, [accountAddress]);

  // TODO: Handle 'fetchError'

  return isFetched ? (
    projects.length > 0 ? (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Slug</Th>
            <Th>Title</Th>
            <Th isNumeric />
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <UserProjectsListItem
              key={project.id}
              project={project}
              onDeleted={handleDeleted}
            />
          ))}
        </Tbody>
      </Table>
    ) : (
      // TODO: EmptyState
      <></>
    )
  ) : (
    <Spinner display="block" mx="auto" my="8" opacity="0.75" />
  );
};

export default UserProjectsList;
