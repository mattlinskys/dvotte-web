import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useSigner from "hooks/useSigner";
import { parseEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { registerDevote } from "api/projectsApi";
import type { IContract } from "types/contract";
import { IChain } from "types/chain";

export interface DevoteFormProps {
  projectId: string;
  contract: IContract;
  chains: IChain[];
  selectedChainId: IChain["id"];
  onChangeChain: (id: IChain["id"]) => void;
  isDisabled?: boolean;
}

interface IFormValues {
  amount: string;
  note: string;
}

const DevoteForm: React.FC<DevoteFormProps> = ({
  projectId,
  contract,
  chains,
  selectedChainId,
  onChangeChain,
  isDisabled,
}) => {
  const toast = useToast();
  const signer = useSigner();
  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = useForm<IFormValues>();

  const onSubmit = useCallback<SubmitHandler<IFormValues>>(
    async ({ amount, note }) => {
      try {
        const receipt = await (
          await signer!.sendTransaction({
            to: contract.address,
            value: parseEther(amount),
          })
        ).wait();

        // TODO: Auth
        try {
          await registerDevote(projectId, {
            chainId: contract.chainId,
            transactionHash: receipt.transactionHash,
            note,
          });
        } catch (err) {
          console.error(err);
        }
      } catch (err: any) {
        toast({
          title: err.message,
          status: "error",
          isClosable: true,
          duration: 10_000,
        });
      }
    },
    [contract.address, projectId, signer, toast]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing="3">
        {chains.length > 1 && (
          <FormControl>
            <FormLabel htmlFor="chainId">Chain</FormLabel>

            <Select
              id="chainId"
              value={selectedChainId}
              onChange={(e) => onChangeChain(parseInt(e.target.value))}
            >
              {chains.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id="amount"
            {...register("amount", {
              required: true,
              validate: {
                valid: (amount) => {
                  try {
                    return parseEther(amount).gt(BigNumber.from(0));
                  } catch {
                    return false;
                  }
                },
              },
            })}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="note">Note</FormLabel>
          <Textarea id="note" {...register("note")} />
        </FormControl>

        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={!signer || isDisabled}
          colorScheme="brand"
        >
          Devote
        </Button>
      </VStack>
    </form>
  );
};

export default DevoteForm;
