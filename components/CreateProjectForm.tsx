import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSigner from "hooks/useSigner";
import {
  AspectRatio,
  Button,
  CloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AttachmentIcon, EditIcon } from "@chakra-ui/icons";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";
import FileInput from "components/FileInput";
import useChains from "hooks/useChains";
import type { IProject, SocialType } from "types/project";
import dynamic from "next/dynamic";
import { AuthContext } from "contexts/AuthContext";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";

import "react-quill/dist/quill.snow.css";
import { IContract } from "types/contract";
import {
  createProject,
  updateProject,
  uploadProjectBanner,
} from "api/projectsApi";
import { AxiosError } from "axios";

const ContentEditorModal = dynamic(
  () => import("components/ContentEditorModal"),
  {
    ssr: false,
  }
);

interface CreateProjectFormProps {
  project?: IProject;
  onSaved: (project: IProject) => void;
}

interface FormValues {
  slug: string;
  title: string;
  description: string;
  bannerFile?: File;
  content: string;
  color: string;
  contracts: IContract[];
  socials: { type: SocialType; url: string }[];
}

// TODO: Translations
// TODO: Use error.content.type from schema (do not inject messages)
const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  project,
  onSaved,
}) => {
  const toast = useToast();
  const signer = useSigner();
  const { isAuthenticated } = useContext(AuthContext);
  const chains = useChains();
  const [isEditorOpen, setEditorOpen] = useState(false);
  const schema = useMemo(
    () =>
      yup
        .object({
          title: yup.string().required(),
          slug: yup
            .string()
            .matches(/^\w(-?\w)*$/i)
            .required(),
          description: yup.string().required(),
          content: yup.string().required(),
          color: yup.string().required(),
          contracts: yup
            .array()
            .of(
              yup.object().shape({
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
              })
            )
            .test("uniqueChains", (contracts) => {
              const validContracts = contracts!.filter(
                ({ chainId }) => !Number.isNaN(chainId)
              );
              return (
                [...new Set(validContracts!.map(({ chainId }) => chainId))]
                  .length === validContracts?.length
              );
            })
            .required()
            .min(1),
        })
        .required(),
    [chains]
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    getFieldState,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      title: project?.title ?? "",
      slug: project?.slug ?? "",
      description: project?.description ?? "",
      content: project?.content ?? "",
      color: project?.color ?? "#3182ce",
      contracts: project?.contracts ?? [{ address: "" }],
      socials: [],
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
  const content = watch("content");
  const bannerFile = watch("bannerFile");
  // TODO: Revoke
  const bannerObjectUrl = useMemo(
    () => bannerFile && URL.createObjectURL(bannerFile),
    [bannerFile]
  );
  const bannerUrl = bannerObjectUrl || project?.bannerUrl;

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

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async ({ bannerFile, ...values }) => {
      try {
        let { data: savedProject } = project
          ? await updateProject(project.id, values)
          : await createProject(values);

        if (bannerFile) {
          const formData = new FormData();
          formData.append("banner", bannerFile);
          savedProject = (await uploadProjectBanner(savedProject.id, formData))
            .data;
        }

        onSaved(savedProject);
      } catch (err: any) {
        if ((err as AxiosError).response?.status === 409) {
          setError("slug", { type: "taken" }, { shouldFocus: true });
        } else {
          toast({
            title: err.message,
            status: "error",
            isClosable: true,
            duration: 10_000,
          });
        }
      }
    },
    [project?.id, toast, onSaved]
  );

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VStack align="stretch" spacing="3">
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
            {bannerUrl && (
              <AspectRatio
                ratio={4 / 1}
                mb="3"
                rounded="md"
                overflow="hidden"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.600"
              >
                <Image src={bannerUrl} objectFit="cover" />
              </AspectRatio>
            )}
            <Button
              onClick={() => {
                (
                  document.querySelector("input#banner") as HTMLElement
                )?.click();
              }}
              variant="outline"
              leftIcon={<Icon as={AttachmentIcon} />}
              isFullWidth
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
            <FormHelperText>
              Main, top banner (best in 4:1 ratio)
            </FormHelperText>
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
            <Button
              onClick={() => setEditorOpen(true)}
              variant="outline"
              leftIcon={<Icon as={EditIcon} />}
              isFullWidth
            >
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
                        <option key={chain.id} value={chain.id}>
                          {chain.name}{" "}
                          {chain.nativeCurrency
                            ? `(${chain.nativeCurrency.name})`
                            : ""}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <CloseButton onClick={() => removeContract(i)} />
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

        <Button
          type="submit"
          isDisabled={!isAuthenticated}
          isLoading={isSubmitting}
          mt="4"
          isFullWidth
        >
          Create
        </Button>
      </form>

      <ContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setEditorOpen(false)}
        defaultValue={content}
        onSave={(html) => {
          setValue("content", html);
          setEditorOpen(false);
        }}
      />
    </>
  );
};

export default CreateProjectForm;
