import React from "react";
import {
  Modal,
  ModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

export interface DialogProps extends Omit<ModalProps, "onClose" | "children"> {
  title: string | React.ReactNode;
  onClose?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  onClose,
  children,
  ...rest
}) => (
  <Modal onClose={onClose ?? (() => {})} {...rest}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      {onClose && <ModalCloseButton />}
      <ModalBody pb="6">{children}</ModalBody>
    </ModalContent>
  </Modal>
);

export default Dialog;
