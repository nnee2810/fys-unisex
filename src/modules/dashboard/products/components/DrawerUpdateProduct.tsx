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
import { ModalBaseProps } from "interfaces"
import { productClassifyOptions } from "modules/products/constants"
import { IProductEntity } from "modules/products/interfaces"
import { FormProvider } from "react-hook-form"
import { useFormUpdateProduct } from "../hooks"

interface DrawerUpdateProductProps extends ModalBaseProps {
  data?: IProductEntity
}

export function DrawerUpdateProduct({
  isOpen,
  data,
  onClose,
}: DrawerUpdateProductProps) {
  const { methods, handleSubmit, isLoading } = useFormUpdateProduct({
    data,
    onClose,
  })

  return (
    <Drawer isOpen={isOpen} size="sm" placement="right" onClose={onClose}>
      <DrawerOverlay />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Sửa sản phẩm</DrawerHeader>
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
                Xong
              </NextButton>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  )
}
