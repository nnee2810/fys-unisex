import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import {
  Field,
  FieldLabel,
  NextButton,
  SelectField,
  TextField,
} from "components"
import { useRouter } from "next/router"
import { FormProvider } from "react-hook-form"
import { productClassifyOptions, productSizeOptions } from "../constants"
import { GetProductsDto } from "../dto"
import { useFormSearchProducts } from "../hooks"

interface FormSearchProductsProps {
  query: GetProductsDto
  isLoading?: boolean
}

export function FormSearchProducts({
  query,
  isLoading,
}: FormSearchProductsProps) {
  const router = useRouter()
  const { methods, handleSubmit } = useFormSearchProducts(query)

  const handleReset = () => {
    router.push("/products")
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
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
