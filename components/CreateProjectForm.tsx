import React, { useCallback, useEffect, useMemo } from "react";
import useSigner from "hooks/useSigner";
import {
  AspectRatio,
  Button,
  CloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";
import FileInput from "components/FileInput";
import useChains from "hooks/useChains";

interface FormValues {
  slug: string;
  title: string;
  description: string;
  bannerFile?: File;
  content: string;
  color: string;
  contracts: { address: string; chainId: number }[];
}

// TODO: Translations
const CreateProjectForm: React.FC = () => {
  const signer = useSigner();
  const chains = useChains();
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
      color: "#3182ce",
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
  const bannerFile = watch("bannerFile");
  // TODO: Revoke
  const bannerObjectUrl = useMemo(
    () => bannerFile && URL.createObjectURL(bannerFile),
    [bannerFile]
  );

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
          <InputGroup>
            <InputLeftAddon fontSize="sm">
              {process.env.NEXT_PUBLIC_NEW_PROJECT_SLUG_PREFIX}
            </InputLeftAddon>
            <Input id="slug" {...register("slug")} />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="banner">Banner</FormLabel>
          {bannerObjectUrl && (
            <AspectRatio
              ratio={4 / 1}
              mb="3"
              rounded="md"
              overflow="hidden"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.600"
            >
              <Image src={bannerObjectUrl} objectFit="cover" />
            </AspectRatio>
          )}
          <Button
            variant="outline"
            isFullWidth
            onClick={() => {
              (document.querySelector("input#banner") as HTMLElement)?.click();
            }}
          >
            Browse files
          </Button>
          <FileInput<FormValues>
            id="banner"
            type="file"
            display="none"
            name="bannerFile"
            control={control}
          />
          <FormHelperText>Main, top banner (best in 4:1 ratio)</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea id="description" {...register("description")} />
          <FormHelperText>
            Short description about project for metadata purposes
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Content</FormLabel>
          <Button isFullWidth variant="outline">
            Open editor
          </Button>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="color">Color</FormLabel>
          <Input id="color" type="color" {...register("color")} />
        </FormControl>

        <FormControl>
          <FormLabel>Contracts</FormLabel>

          <VStack as="ul" align="stretch" spacing="2">
            {contractsFields.map((field, i) => (
              <HStack key={field.id} as="li" spacing="2">
                <FormControl
                // isInvalid={
                //   !!errors?.contracts?.[i] || !!errors?.contracts?.[i]?.address
                // }
                >
                  <Input
                    placeholder="Contract address"
                    {...register(`contracts.${i}.address` as const)}
                  />
                </FormControl>

                <FormControl>
                  <Select
                    placeholder="Select  chain"
                    {...register(`contracts.${i}.chainId` as const, {
                      valueAsNumber: true,
                    })}
                  >
                    {chains.map((chain) => (
                      <option value={chain.id}>
                        {chain.name}{" "}
                        {chain.nativeCurrency
                          ? `(${chain.nativeCurrency.name})`
                          : ""}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {contractsFields.length > 1 && (
                  <CloseButton onClick={() => removeContract(i)} />
                )}
              </HStack>
            ))}

            <HStack justify="flex-end">
              <Button
                variant="ghost"
                onClick={() => appendContract({ address: "" })}
              >
                + Add
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </VStack>

      <Button type="submit" mt="6" isFullWidth>
        Create
      </Button>
    </form>
  );
};

export default CreateProjectForm;
