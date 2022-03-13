import type { NextPage } from "next";
import PageLayout from "components/PageLayout";
import { useRouter } from "next/router";

const ContractPage: NextPage = () => {
  const {
    query: { address, chainId },
  } = useRouter();
  // TODO: is address valid
  // TODO:
  const chain = chainId;

  return (
    <>
      <PageLayout>
        <p>
          Contract {address} {chainId}
        </p>
      </PageLayout>

      {!chain && <>{/* //TODO: Modal to select chain */}</>}
    </>
  );
};

export default ContractPage;
