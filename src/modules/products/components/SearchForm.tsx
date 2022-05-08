import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import Field, { FieldLabel } from "components/Field"
import SelectField from "components/Field/SelectField"
import TextField from "components/Field/TextField"
import { ISelectOption } from "interfaces/ISelectOption"
import { useRouter } from "next/router"
import qs from "query-string"
import { FormProvider, useForm } from "react-hook-form"
import { deleteWhiteSpace } from "utils/deleteWhiteSpace"
import * as yup from "yup"
import { sizeOptions, sortOptions, typeOptions } from "../constants"
import { GetProductsDto } from "../dto/get-products-dto"

interface SearchFormProps {
  query: GetProductsDto
  isLoading?: boolean
}

interface FormValues {
  name?: string
  size?: ISelectOption<string>
  type?: ISelectOption<string>
  sort?: ISelectOption<string>
  minPrice?: number
  maxPrice?: number
}

const schema = yup.object().shape({
  name: yup.string(),
  size: yup.object().nullable(),
  type: yup.object().nullable(),
  sort: yup.object().nullable(),
  minPrice: yup
    .number()
    .min(0, "Giá trị không hợp lệ")
    .transform((value) => (isNaN(value) ? undefined : value))
    .when("maxPrice", (maxPrice: number, schema) => {
      return schema.test({
        test: (minPrice: number) =>
          minPrice >= 0 && maxPrice >= 0 ? minPrice < maxPrice : true,
        message: "Giá trị không hợp lệ",
      })
    }),
  maxPrice: yup
    .number()
    .min(0, "Giá trị không hợp lệ")
    .transform((value) => (isNaN(value) ? undefined : value)),
})

export default function SearchForm({ query, isLoading }: SearchFormProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: deleteWhiteSpace(query.name),
      size: sizeOptions.find((option) => option.value === query.size),
      type: typeOptions.find((option) => option.value === query.type),
      sort: sortOptions.find((option) => option.value === query.sort),
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = ({
    name,
    size,
    sort,
    type,
    minPrice,
    maxPrice,
  }: FormValues) => {
    let submitData: GetProductsDto = {}
    if (name) submitData.name = deleteWhiteSpace(name)
    if (size) submitData.size = size.value
    if (sort) submitData.sort = sort.value
    if (type) submitData.type = type.value
    if (minPrice) submitData.minPrice = minPrice
    if (maxPrice) submitData.maxPrice = maxPrice

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
            <Field
              name="name"
              label="Tên sản phẩm"
              render={({ field }) => <TextField {...field} />}
            />
            <Field
              name="size"
              label="Kích cỡ"
              render={({ field }) => (
                <SelectField {...field} options={sizeOptions} />
              )}
            />
            <Field
              name="type"
              label="Loại sản phẩm"
              render={({ field }) => (
                <SelectField {...field} options={typeOptions} />
              )}
            />
            <Box>
              <FieldLabel>Khoảng giá</FieldLabel>
              <HStack alignItems="flex-start">
                <Field
                  name="minPrice"
                  render={({ field }) => (
                    <TextField {...field} type="number" placeholder="Từ" />
                  )}
                />
                <Text transform="translateY(8px)" translateX="8px">
                  —
                </Text>
                <Field
                  name="maxPrice"
                  render={({ field }) => (
                    <TextField {...field} type="number" placeholder="Đến" />
                  )}
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
