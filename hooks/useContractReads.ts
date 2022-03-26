import { useEffect, useMemo, useState } from "react";
import useBlockNumber from "hooks/useBlockNumber";
import { Contract } from "ethers";

const useContractReads = <T extends any>({
  reads,
  contract,
  watch,
}: {
  reads: {
    method: string;
    args?: any[];
  }[];
  contract: Contract | undefined;
  watch?: boolean;
}) => {
  const [results, setResults] = useState<any[]>([]);
  const blockNumber = useBlockNumber();
  const readsStr = useMemo(() => JSON.stringify(reads), [reads]);

  useEffect(() => {
    setResults([]);
  }, [readsStr, contract]);

  useEffect(() => {
    if (!contract || reads.length === 0) {
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const data = (
          await Promise.all(
            reads.map(({ method, args = [] }) =>
              contract.functions[method](...args)
            )
          )
        ).flat();

        if (!controller.signal.aborted) {
          setResults(data);
        }
      } catch (err: any) {
        console.error(err);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [contract, readsStr, watch && blockNumber]);

  return results as T;
};

export default useContractReads;
