import React, { Props } from "react";
import { Input, InputProps } from "@chakra-ui/react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type FileInputProps<T> = InputProps & UseControllerProps<T>;

const FileInput = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...rest
}: FileInputProps<T>) => {
  const {
    field: { onChange, value: _, ...field },
  } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <Input
      type="file"
      onChange={(e) => {
        onChange(e.target.files?.[0]);
      }}
      {...field}
      {...rest}
    />
  );
};

export default FileInput;
