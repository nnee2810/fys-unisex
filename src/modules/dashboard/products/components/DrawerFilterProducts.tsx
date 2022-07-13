import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react"
import { NextButton } from "components"
import { ModalBaseProps } from "interfaces"
import { useFormFilterProducts } from "../hooks"

export function DrawerFilterProducts({ isOpen, onClose }: ModalBaseProps) {
  const { methods } = useFormFilterProducts()
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Lọc sản phẩm</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <NextButton w="100%">Lọc</NextButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
