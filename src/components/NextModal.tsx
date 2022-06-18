import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react"
import { NextButton } from "."

export interface ModalBaseProps {
  isOpen: boolean
  onClose: () => void
}

export interface NextModalProps extends ModalBaseProps, ModalProps {
  title?: string
  closeText?: string
  confirmText?: string
  onConfirm?: () => void
}

export function NextModal({
  title,
  closeText,
  confirmText,

  onClose,
  onConfirm,
  children,
  ...props
}: NextModalProps) {
  return (
    <Modal onClose={onClose} {...props}>
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
              {closeText || "Đóng"}
            </NextButton>
            <NextButton type="submit" onClick={onConfirm}>
              {confirmText || "Đồng ý"}
            </NextButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
