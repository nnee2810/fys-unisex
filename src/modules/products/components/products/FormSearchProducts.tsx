import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "components/Button"
import Field, { FieldLabel } from "components/Field"
import SelectField from "components/Field/SelectField"
import TextField from "components/Field/TextField"
import { ProductClassify, ProductSize } from "interfaces/IProduct"
import { useRouter } from "next/router"
import qs from "query-string"
import { FormProvider, useForm } from "react-hook-form"
import { deleteWhiteSpace } from "utils/deleteWhiteSpace"
import { getValidateInvalidMessage } from "utils/getValidateMessage"
import * as yup from "yup"
import { productClassifyOptions, productSizeOptions } from "../../constants"
import { GetProductsDto } from "../../dto/get-products-dto"

interface FormSearchProductsProps {
  query: GetProductsDto
  isLoading?: boolean
}
interface FormValues {
  name?: string
  size?: ProductSize
  classify?: ProductClassify
  minPrice?: number
  maxPrice?: number
}

const schema = yup.object().shape({
  name: yup.string(),
  size: yup
    .string()
    .label("Kích cỡ")
    .test({
      test: (value) =>
        value ? Object.keys(ProductSize).includes(value) : true,
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
  classify: yup
    .string()
    .label("Loại sản phẩm")
    .test({
      test: (value) =>
        value ? Object.keys(ProductClassify).includes(value) : true,
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
  minPrice: yup
    .number()
    .label("Giá tối thiểu")
    .min(0, ({ label }) => getValidateInvalidMessage(label))
    .when("maxPrice", (maxPrice: number, schema) => {
      return schema.test({
        test: (minPrice: number) =>
          minPrice >= 0 && maxPrice >= 0 ? minPrice < maxPrice : true,
        message: ({ label }: { label: string }) =>
          getValidateInvalidMessage(label),
      })
    })
    .transform((value) => (isNaN(value) ? undefined : value)),
  maxPrice: yup
    .number()
    .label("Giá tối đa")
    .min(0, ({ label }) => getValidateInvalidMessage(label))
    .transform((value) => (isNaN(value) ? undefined : value)),
})

export default function FormSearchProducts({
  query,
  isLoading,
}: FormSearchProductsProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: query.name || "",
      size: query.size,
      classify: query.classify,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = (data: FormValues) => {
    let submitData: GetProductsDto = {
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
          <Stack spacing="4">
            <Field name="name" label="Tên sản phẩm" component={<TextField />} />
            <Field
              name="size"
              label="Kích cỡ"
              component={<SelectField options={productSizeOptions} />}
            />
            <Field
              name="classify"
              label="Loại sản phẩm"
              component={<SelectField options={productClassifyOptions} />}
            />
            <Box>
              <FieldLabel>Khoảng giá</FieldLabel>
              <HStack alignItems="flex-start">
                <Field
                  name="minPrice"
                  component={<TextField type="number" placeholder="Từ" />}
                />
                <Text transform="translateY(8px)" translateX="8px">
                  —
                </Text>
                <Field
                  name="maxPrice"
                  component={<TextField type="number" placeholder="Đến" />}
                />
              </HStack>
            </Box>
          </Stack>
          <Stack mt="6">
            <Button type="submit" isLoading={isLoading} isDisabled={isLoading}>
              Lọc
            </Button>
            {Object.keys(query).length && (
              <Button colorScheme="red" onClick={handleReset}>
                Đặt lại
              </Button>
            )}
          </Stack>
        </Box>
      </form>
    </FormProvider>
  )
}
