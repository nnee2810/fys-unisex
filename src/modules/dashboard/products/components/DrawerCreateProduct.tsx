import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Field, NextButton, SelectField, TextField } from "components"
import { DrawerBaseProps } from "interfaces"
import { productClassifyOptions } from "modules/products/constants"
import { useEffect } from "react"
import { FormProvider } from "react-hook-form"
import { useFormCreateProduct } from "../hooks"

export function DrawerCreateProduct({ isOpen, onClose }: DrawerBaseProps) {
  const { methods, handleSubmit, isLoading } = useFormCreateProduct(onClose)

  useEffect(() => {
    if (!isOpen) methods.reset()
  }, [isOpen])

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Thêm sản phẩm</DrawerHeader>
            <DrawerBody>
              <Stack>
                <Field
                  name="name"
                  label="Tên sản phẩm"
                  component={<TextField />}
                />
                <Field
                  name="classify"
                  label="Phân loại"
                  component={<SelectField options={productClassifyOptions} />}
                />
                <Field
                  name="price"
                  label="Giá"
                  component={<TextField type="number" after={<Text>đ</Text>} />}
                />
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <NextButton w="100%" type="submit" isLoading={isLoading}>
                Thêm
              </NextButton>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  )
}
