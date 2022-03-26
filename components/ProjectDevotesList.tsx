import { useEffect, useState } from "react";
import { getProjectDevotes } from "api/projectsApi";
import type { IDevote } from "types/project";
import { Box, Button, Spinner } from "@chakra-ui/react";

interface ProjectDevotesListProps {
  projectId: string;
  limit?: number;
}

const ProjectDevotesList: React.FC<ProjectDevotesListProps> = ({
  projectId,
  limit = 30,
}) => {
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [devotes, setDevotes] = useState<IDevote[]>([]);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchDevotes = async () => {
      try {
        setFetching(true);

        const { data } = await getProjectDevotes(projectId, offset, limit);

        setTotal(data.total);
        setDevotes(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchDevotes();
  }, [offset]);

  useEffect(() => {
    if (offset !== 0) {
      setOffset(0);
    }
  }, [projectId]);

  return (
    <>
      <Box textAlign="center">
        {isFetching ? (
          <Spinner />
        ) : (
          total > devotes.length && (
            <Button>Show more ({total - devotes.length})</Button>
          )
        )}
      </Box>
    </>
  );
};

export default ProjectDevotesList;
