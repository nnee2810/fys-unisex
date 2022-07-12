import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Field,
  FieldLabel,
  NextButton,
  SelectField,
  TextField,
} from "components"
import { ProductClassify, ProductSize } from "modules/products/interfaces"
import { useRouter } from "next/router"
import qs from "query-string"
import { FormProvider, useForm } from "react-hook-form"
import { deleteWhiteSpace, getValidateInvalidMessage } from "utils"
import * as yup from "yup"
import { productClassifyOptions, productSizeOptions } from "../constants"
import { GetProductListDto } from "../dto"

interface FormSearchProductsProps {
  query: GetProductListDto
  isLoading?: boolean
}
interface FormValues {
  name?: string
  size?: ProductSize
  classify?: ProductClassify
  min_price?: number
  max_price?: number
}

const schema = yup.object({
  name: yup.string(),
  size: yup
    .string()
    .label("Kích cỡ")
    .oneOf(Object.keys(ProductSize), getValidateInvalidMessage),
  classify: yup
    .string()
    .label("Loại sản phẩm")
    .oneOf(Object.keys(ProductClassify), getValidateInvalidMessage),
  min_price: yup
    .number()
    .label("Giá tối thiểu")
    .min(0, getValidateInvalidMessage)
    .when("max_price", (max_price: number, schema) => {
      return schema.test({
        test: (min_price: number) =>
          min_price >= 0 && max_price >= 0 ? min_price < max_price : true,
        message: getValidateInvalidMessage,
      })
    })
    .transform((value) => (isNaN(value) ? undefined : value)),
  max_price: yup
    .number()
    .label("Giá tối đa")
    .min(0, getValidateInvalidMessage)
    .transform((value) => (isNaN(value) ? undefined : value)),
})

export function FormSearchProducts({
  query,
  isLoading,
}: FormSearchProductsProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: query.name || "",
      size: query.size,
      classify: query.classify,
      min_price: query.min_price,
      max_price: query.max_price,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (data: FormValues) => {
    let submitData: GetProductListDto = {
      ...query,
      ...data,
      name: deleteWhiteSpace(data.name),
    }

    const queryString = qs.stringify(submitData, {
      skipEmptyString: true,
      skipNull: true,
    })

    if (queryString) router.push(`?${queryString}`)
  }
  const handleReset = () => {
    router.push("/products")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Box position="sticky" top="60px">
          <Stack>
            <Field name="name" label="Tên sản phẩm" component={<TextField />} />
            <Field
              name="size"
              label="Kích cỡ"
              component={
                <SelectField options={productSizeOptions} isClearable />
              }
            />
            <Field
              name="classify"
              label="Loại sản phẩm"
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
          </Stack>
          <Stack mt="6">
            <NextButton
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Lọc
            </NextButton>
            {Object.keys(query).length && (
              <NextButton colorScheme="red" onClick={handleReset}>
                Đặt lại
              </NextButton>
            )}
          </Stack>
        </Box>
      </form>
    </FormProvider>
  )
}
