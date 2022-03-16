import React, { useCallback, useEffect, useMemo } from "react";
import useSigner from "hooks/useSigner";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";

interface FormValues {
  slug: string;
  title: string;
  description: string;
  content: string;
  color: string;
  contracts: { address: string; chainId: number }[];
}

// TODO: Translations
const CreateProjectForm: React.FC = () => {
  const signer = useSigner();

  const schema = useMemo(() => yup.object({}).required(), []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getFieldState,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      slug: "",
      title: "",
      description: "",
      content: "",
      color: "",
      contracts: [],
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const {
    fields: contractsFields,
    append: appendContract,
    remove: removeContract,
  } = useFieldArray({
    name: "contracts",
    control,
  });

  useEffect(() => {
    const { unsubscribe } = watch(({ title, slug }, { name, type }) => {
      if (
        name === "title" &&
        type === "change" &&
        (!getFieldState("slug").isTouched || slugify(title!).startsWith(slug!))
      ) {
        setValue("slug", slugify(title!));
      }
    });
    return unsubscribe;
  }, [watch, getFieldState, setValue]);

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async () => {}, [
    signer,
  ]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing="4">
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" {...register("title")} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="slug">Slug</FormLabel>
          <Input id="slug" {...register("slug")} />
        </FormControl>
      </VStack>

      <Button type="submit" mt="6" isFullWidth>
        Create
      </Button>
    </form>
  );
};

export default CreateProjectForm;
