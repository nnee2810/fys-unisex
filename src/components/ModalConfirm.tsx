import {
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { IModalProps } from "interfaces/IModalProps"
import React from "react"
import Button from "./Button"

export default function ModalConfirm({
  isOpen,
  children,
  title,
  closeText,
  confirmText,
  onClose,
  onConfirm,
}: IModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <Grid p="6" templateColumns="1fr 1fr" gap="2">
          <Button colorScheme="blackAlpha" variant="outline" onClick={onClose}>
            {closeText || "Đóng"}
          </Button>
          <Button onClick={onConfirm}>{confirmText || "Đồng ý"}</Button>
        </Grid>
      </ModalContent>
    </Modal>
  )
}
