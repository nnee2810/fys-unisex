import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
import { NextButton } from "components"
import { ModalBaseProps } from "interfaces"

export function DrawerCreateProduct({ isOpen, onClose }: ModalBaseProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Thêm sản phẩm</DrawerHeader>
        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <NextButton w="100%">Thêm</NextButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
