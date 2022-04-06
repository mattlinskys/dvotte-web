import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAccountAddress from "hooks/useAccountAddress";
import useSigner from "hooks/useSigner";
import { Contract, ContractFactory, utils } from "ethers";
import dvotteContract from "contracts/DVotte.json";
import {
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAddressZero } from "utils/addressUtils";
import SelectChainButton from "components/SelectChainButton";

export interface DeployContractFormProps {
  onDeployed: (contract: Contract) => void;
}

interface FormValues {
  addresses: { value: string }[];
  releaseThreshold: string;
}

// TODO: Translations
const DeployContractForm: React.FC<DeployContractFormProps> = ({
  onDeployed,
}) => {
  const signer = useSigner();
  const accountAddress = useAccountAddress();
  const toast = useToast();

  const schema = useMemo(
    () =>
      yup
        .object({
          addresses: yup
            .array()
            .of(
              yup.object().shape({
                value: yup
                  .string()
                  .required()
                  .test(
                    "isAddress",
                    (value) => utils.isAddress(value!) && !isAddressZero(value!)
                  ),
              })
            )
            .required()
            .min(1)
            .test(
              "unique",
              (addresses) =>
                [
                  ...new Set(
                    addresses!.map((address) =>
                      utils.isAddress(address.value!)
                        ? utils.getAddress(address.value!)
                        : address.value
                    )
                  ),
                ].length === addresses!.length
            ),
          // TODO:
          releaseThreshold: yup.string().required(),
        })
        .required(),
    []
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      addresses: accountAddress ? [{ value: accountAddress }] : [],
      releaseThreshold: "0.05",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const {
    fields: addressesFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    name: "addresses",
    control,
  });

  useEffect(() => {
    if (
      accountAddress &&
      !getValues().addresses.some(({ value }) => value === accountAddress)
    ) {
      appendAddress({ value: accountAddress });
    }
  }, [accountAddress]);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async ({ addresses, releaseThreshold }) => {
      try {
        const factory = new ContractFactory(
          dvotteContract.abi,
          dvotteContract.bytecode,
          signer!
        );

        const contract = await factory.deploy(
          utils.parseEther(releaseThreshold),
          addresses.map(({ value }) => value)
        );
        await contract.deployTransaction.wait();

        onDeployed(contract);
      } catch (err: any) {
        if (err.code !== 4001) {
          toast({
            title: err.message,
            status: "error",
            isClosable: true,
            duration: 10_000,
          });
        }
      }
    },
    [signer, onDeployed, toast]
  );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing="3">
        <FormControl>
          <FormLabel>Network</FormLabel>
          <SelectChainButton />
        </FormControl>

        <FormControl>
          <FormLabel>Members</FormLabel>
          <VStack as="ul" align="stretch" spacing="2">
            {addressesFields.map((field, i) => (
              <HStack key={field.id} as="li" spacing="2">
                <FormControl
                  isInvalid={
                    !!errors?.addresses?.[i] || !!errors?.addresses?.[i]?.value
                  }
                >
                  <Input {...register(`addresses.${i}.value` as const)} />
                  <FormErrorMessage>
                    {
                      // @ts-ignore
                      errors?.addresses?.[i]?.message ||
                        errors?.addresses?.[i]?.value?.message
                    }
                  </FormErrorMessage>
                </FormControl>
                {addressesFields.length > 1 && (
                  <CloseButton onClick={() => removeAddress(i)} />
                )}
              </HStack>
            ))}

            <HStack justify="flex-end">
              <Button
                variant="ghost"
                onClick={() => appendAddress({ value: "" })}
              >
                + Add
              </Button>
            </HStack>
          </VStack>
        </FormControl>

        <FormControl isInvalid={!!errors.releaseThreshold}>
          <FormLabel htmlFor="releaseThreshold">Release threshold</FormLabel>
          <Input
            id="releaseThreshold"
            type="number"
            min="0"
            placeholder="e.g. 0.001"
            {...register("releaseThreshold")}
          />
          {errors.releaseThreshold ? (
            <FormErrorMessage>
              {errors.releaseThreshold.message}
            </FormErrorMessage>
          ) : (
            <FormHelperText>
              Minimum amount for a member to release from contract
            </FormHelperText>
          )}
        </FormControl>
      </VStack>

      <Button type="submit" mt="4" isFullWidth isLoading={isSubmitting}>
        Deploy
      </Button>
    </form>
  );
};

export default DeployContractForm;
