import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react"
import {
  Field,
  FieldLabel,
  NextButton,
  NextViewer,
  SelectBoxField,
  SelectField,
  TextField,
} from "components"
import { confirmOptions } from "configs/constants"
import { ModalBaseProps } from "interfaces"
import { IProductEntity } from "interfaces/entities"
import { productClassifyOptions } from "modules/products/constants"
import { useState } from "react"
import { FormProvider } from "react-hook-form"
import { ProductImage, ProductImageDropzone } from "."
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
  const [selectView, setSelectView] = useState("")

  return (
    <Drawer isOpen={isOpen} size="lg" placement="right" onClose={onClose}>
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
                <Field
                  name="sale_price"
                  label="Giá sale"
                  component={<TextField type="number" after={<Text>đ</Text>} />}
                />
                <Field
                  name="for_sale"
                  label="Đang bán"
                  component={<SelectBoxField options={confirmOptions} />}
                />
                <Field
                  name="in_sale"
                  label="Đang sale"
                  component={<SelectBoxField options={confirmOptions} />}
                />
                <Field
                  name="in_stock"
                  label="Có sẵn"
                  component={<SelectBoxField options={confirmOptions} />}
                />
                <Box>
                  <FieldLabel>Hình ảnh</FieldLabel>
                  <Grid templateColumns="repeat(3, 1fr)" gap="2">
                    {data?.images?.map((item) => (
                      <ProductImage
                        data={item}
                        key={item.id}
                        onSelectView={setSelectView}
                      />
                    ))}
                    <ProductImageDropzone id={data?.id} />
                  </Grid>
                </Box>
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
      <NextViewer
        visible={!!selectView}
        onClose={() => setSelectView("")}
        images={[{ src: "", alt: "" }]}
      />
    </Drawer>
  )
}
