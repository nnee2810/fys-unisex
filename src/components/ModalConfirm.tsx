import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { IModalProps } from "interfaces"
import { Button } from "."

export function ModalConfirm({
  isOpen,
  children,
  title,
  size,
  closeText,
  confirmText,
  onClose,
  onConfirm,
}: IModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              colorScheme="blackAlpha"
              variant="outline"
              onClick={onClose}
            >
              {closeText || "Đóng"}
            </Button>
            <Button onClick={onConfirm}>{confirmText || "Đồng ý"}</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
