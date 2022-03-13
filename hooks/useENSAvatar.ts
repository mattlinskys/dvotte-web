import { useEffect, useState } from "react";
import useLibrary from "hooks/useLibrary";

const useENSAvatar = (nameOrAddress: string) => {
  const library = useLibrary();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (library) {
      (async () => {
        try {
          setAvatar(await library.getAvatar(nameOrAddress));
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [library, nameOrAddress]);

  return avatar;
};

export default useENSAvatar;
