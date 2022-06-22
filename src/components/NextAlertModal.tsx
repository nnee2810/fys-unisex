import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { NextButton } from "./NextButton"

interface NextAlertModalProps {
  isOpen: boolean
  title: string
  children: ReactNode
  closeText?: string
  confirmText?: string
  onClose(): void
  onConfirm(): void
  isLoading?: boolean
}

export function NextAlertModal({
  isOpen,
  title,
  children,
  closeText,
  confirmText,
  onClose,
  onConfirm,
  isLoading,
}: NextAlertModalProps) {
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <NextButton
              colorScheme="blackAlpha"
              variant="outline"
              onClick={onClose}
            >
              {closeText || "Hủy"}
            </NextButton>
            <NextButton
              colorScheme="red"
              isLoading={isLoading}
              onClick={onConfirm}
            >
              {confirmText || "Đồng ý"}
            </NextButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
