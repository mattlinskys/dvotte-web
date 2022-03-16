import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAccountAddress from "hooks/useAccountAddress";
import useSigner from "hooks/useSigner";
import { Contract, ContractFactory, errors, utils } from "ethers";
import dvotteContract from "contracts/DVotte.json";
import type { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
  Button,
  Checkbox,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { compareAddresses } from "utils/addressUtils";

export interface DeployContractFormProps {
  onDeployed: (contract: Contract, receipt: TransactionReceipt) => void;
}

interface FormValues {
  addresses: { value: string }[];
  releaseThreshold: string;
  deployOffline: boolean;
}

// TODO: Translations
const DeployContractForm: React.FC<DeployContractFormProps> = ({
  onDeployed,
}) => {
  const signer = useSigner();
  const accountAddress = useAccountAddress();

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
                  .required("Required")
                  .test("isAddress", "Not a address", (value) =>
                    utils.isAddress(value!)
                  ),
              })
              // TODO:
              // .test(
              //   "unique",
              //   "Address must be unique",
              //   (address, { parent: addresses, path }) => {
              //     const [, index] = path.match(/\[(\d+)\]$/)!;
              //     return (
              //       parseInt(index) <=
              //       (addresses as FormValues["addresses"]).findIndex(
              //         ({ value }) =>
              //           compareAddresses(address.value!, value)
              //       )
              //     );
              //   }
              // )
            )
            .min(1),
          // TODO:
          releaseThreshold: yup.string().required("Required"),
        })
        .required(),
    []
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      addresses: accountAddress ? [{ value: accountAddress }] : [],
      releaseThreshold: "0.05",
      deployOffline: false,
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
    async ({ addresses, releaseThreshold, deployOffline }) => {
      const factory = new ContractFactory(
        dvotteContract.abi,
        dvotteContract.bytecode,
        signer!
      );
      const contract = await factory.deploy(
        utils.parseEther(releaseThreshold),
        addresses.map(({ value }) => value)
      );
      const receipt = await contract.deployTransaction.wait();
      onDeployed(contract, receipt);
    },
    [signer, onDeployed]
  );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing="4">
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

        <FormControl>
          <Checkbox {...register("deployOffline")}>
            Deploy contract offline
          </Checkbox>
        </FormControl>
      </VStack>

      <Button type="submit" mt="6" isFullWidth>
        Deploy
      </Button>
    </form>
  );
};

export default DeployContractForm;
