import React, { useEffect, useState } from "react";
import AddressesInput from "components/AddressesInput";
import useAccountAddress from "hooks/useAccountAddress";
import useSigner from "hooks/useSigner";
import { Contract, ContractFactory, utils } from "ethers";
import dvotteContract from "contracts/DVotte.json";
import type { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

export interface DeployContractFormProps {
  onDeployed: (contract: Contract, receipt: TransactionReceipt) => void;
}

const DeployContractForm: React.FC<DeployContractFormProps> = ({
  onDeployed,
}) => {
  const signer = useSigner();
  const accountAddress = useAccountAddress();
  const [addresses, setAddresses] = useState([accountAddress!]);
  const [releaseThreshold, setReleaseThreshold] = useState("0.05");

  useEffect(() => {
    if (accountAddress && !addresses.includes(accountAddress)) {
      setAddresses([...addresses, accountAddress]);
    }
  }, [accountAddress]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const factory = new ContractFactory(
      dvotteContract.abi,
      dvotteContract.bytecode,
      signer!
    );
    const contract = await factory.deploy(
      utils.parseEther(releaseThreshold),
      addresses
    );
    const receipt = await contract.deployTransaction.wait();
    onDeployed(contract, receipt);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <VStack align="stretch" spacing="4">
        <FormControl>
          <FormLabel>Members</FormLabel>
          <AddressesInput
            addresses={addresses}
            onAdd={(address) => setAddresses([...addresses, address])}
            onRemove={(address) =>
              setAddresses(addresses.filter((a) => a !== address))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="releaseThreshold">Release threshold</FormLabel>
          <Input
            id="releaseThreshold"
            type="number"
            min="0"
            value={releaseThreshold}
            onChange={(e) => setReleaseThreshold(e.target.value || "0")}
            placeholder="e.g. 0.001"
          />
          <FormHelperText>
            Minimum amount for member to release from contract
          </FormHelperText>
        </FormControl>

        <FormControl>
          <Checkbox>Deploy contract offline</Checkbox>
        </FormControl>
      </VStack>

      <Button mt="6" type="submit">
        Deploy
      </Button>
    </form>
  );
};

export default DeployContractForm;
