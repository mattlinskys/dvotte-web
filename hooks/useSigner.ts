import useLibrary from "hooks/useLibrary";

const useSigner = () => {
  const library = useLibrary();
  return library?.getSigner();
};

export default useSigner;
