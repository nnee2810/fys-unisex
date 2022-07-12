import { Box, Grid, HStack, Text } from "@chakra-ui/react"
import { Field, FieldLabel, SelectField, TextField } from "components"
import {
  productClassifyOptions,
  productSortOptions,
  productStatusOptions,
} from "modules/products/constants"
import { FormProvider } from "react-hook-form"
import { useFormSearchProducts } from "../hooks"

export function FormSearchProducts() {
  const { methods } = useFormSearchProducts()
  return (
    <FormProvider {...methods}>
      <Grid templateColumns="repeat(5, 1fr)" gap="2">
        <Field name="name" label="Tên sản phẩm" component={<TextField />} />
        <Field
          name="classify"
          label="Phân loại"
          component={
            <SelectField options={productClassifyOptions} isClearable />
          }
        />
        <Box>
          <FieldLabel>Khoảng giá</FieldLabel>
          <HStack alignItems="flex-start">
            <Field
              name="min_price"
              component={
                <TextField
                  type="number"
                  placeholder="Từ"
                  after={<Text>đ</Text>}
                />
              }
            />
            <Text transform="translateY(8px)" translateX="8px">
              —
            </Text>
            <Field
              name="max_price"
              component={
                <TextField
                  type="number"
                  placeholder="Đến"
                  after={<Text>đ</Text>}
                />
              }
            />
          </HStack>
        </Box>
        <Field
          name="sort"
          label="Sắp xếp"
          component={<SelectField options={productSortOptions} isClearable />}
        />
        <Field
          name="status"
          label="Sắp xếp"
          component={<SelectField options={productStatusOptions} isClearable />}
        />
      </Grid>
    </FormProvider>
  )
}
