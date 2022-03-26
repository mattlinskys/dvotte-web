import useLibrary from "hooks/useLibrary";
import { useEffect, useState } from "react";

const useBlockNumber = () => {
  const library = useLibrary();
  const [block, setBlock] = useState<number>();

  useEffect(() => {
    const handler = (block: number) => {
      setBlock(block);
    };

    library?.addListener("block", handler);
    return () => {
      library?.removeListener("block", handler);
    };
  }, [library]);

  return block;
};

export default useBlockNumber;
