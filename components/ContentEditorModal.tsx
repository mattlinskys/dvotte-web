import React, { useRef } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import ContentEditor from "components/ContentEditor";
import type ReactQuill from "react-quill";

interface ContentEditorModalProps extends Omit<ModalProps, "children"> {
  defaultValue?: string;
  onSave: (value: string) => void;
}

const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  size = "full",
  defaultValue,
  onSave,
  ...rest
}) => {
  const editorRef = useRef<ReactQuill | null>(null);

  return (
    <Modal size={size} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Content editor</ModalHeader>
        <ModalBody position="relative">
          <Box position="absolute" inset="0" px="6" py="2">
            <ContentEditor ref={editorRef} defaultValue={defaultValue} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() =>
              editorRef.current &&
              onSave(
                editorRef
                  .current!.getEditor()
                  .root.innerHTML.split(" ")
                  .join(" &nbsp;")
              )
            }
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContentEditorModal;
