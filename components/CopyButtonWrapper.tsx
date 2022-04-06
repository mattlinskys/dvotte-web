import React, { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import { useTranslation } from "next-i18next";

interface CopyButtonWrapperProps {
  text: string;
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

const CopyButtonWrapper: React.FC<CopyButtonWrapperProps> = ({
  text,
  children,
}) => {
  const toast = useToast();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    copy(text);
    toast({
      title: t("common:copied"),
      status: "success",
      isClosable: true,
      duration: 3_000,
    });
  }, [text, toast, t]);

  return React.cloneElement<React.ButtonHTMLAttributes<HTMLButtonElement>>(
    children,
    {
      onClick: handleClick,
    }
  );
};

export default CopyButtonWrapper;
