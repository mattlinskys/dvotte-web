import React, { useMemo } from "react";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";
import * as yup from "yup";
import useChains from "hooks/useChains";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

interface ContractFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

interface FormValues {
  address: string;
  chainId: number;
}

const ContractForm: React.FC<ContractFormProps> = ({ onSubmit }) => {
  const chains = useChains();

  const schema = useMemo(
    () =>
      yup.object({
        address: yup
          .string()
          .required()
          .test(
            "isAddress",
            (value) => utils.isAddress(value!) && !isAddressZero(value!)
          ),
        chainId: yup
          .number()
          .required()
          .integer()
          .positive()
          .oneOf(chains.map((chain) => chain.id)),
      }),
    [chains]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      address: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing="3">
        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input id="address" {...register("address")} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="chain">Chain</FormLabel>
          <Select
            placeholder="Select  chain"
            {...register("chainId", {
              valueAsNumber: true,
            })}
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}{" "}
                {chain.nativeCurrency ? `(${chain.nativeCurrency.name})` : ""}
              </option>
            ))}
          </Select>
        </FormControl>
      </VStack>

      <Button type="submit" variant="outline" mt="4" isFullWidth>
        Preview
      </Button>
    </form>
  );
};

export default ContractForm;
