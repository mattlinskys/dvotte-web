import { useEffect, useState } from "react";
import useLibrary from "hooks/useLibrary";

const useENSSupported = () => {
  const library = useLibrary();
  const [isSupported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(false);

    if (library) {
      (async () => {
        try {
          const network = await library.getNetwork();
          setSupported(!!network.ensAddress);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [library]);

  return isSupported;
};

export default useENSSupported;
