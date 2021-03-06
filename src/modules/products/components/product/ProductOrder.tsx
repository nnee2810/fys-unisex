import { Box, HStack, Stack } from "@chakra-ui/react"
import { Field, NextButton, SelectBoxField, TextField } from "components"
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components"

interface ProductOrderProps {}
interface FormValues {
  quantity: number
}

export function ProductOrder() {
  const methods = useForm<FormValues>({
    defaultValues: {
      quantity: 1,
    },
  })
  const watchQuantity = methods.watch("quantity")

  const handleChangeQuantity = (type: "add" | "sub") => {
    if (type === "add") methods.setValue("quantity", +watchQuantity + 1)
    if (type === "sub" && +watchQuantity > 1)
      methods.setValue("quantity", +watchQuantity - 1)
  }

  return (
    <Box>
      <FormProvider {...methods}>
        <Stack>
          <Field
            name="color"
            label="Màu sắc"
            component={
              <SelectBoxField
                options={[
                  {
                    label: "Vàng",
                    value: 1,
                  },
                  {
                    label: "Vàng",
                    value: 2,
                  },
                  {
                    label: "Vàng",
                    value: 3,
                  },
                ]}
              />
            }
          />
          <Field
            name="size"
            label="Kích thước"
            component={
              <SelectBoxField
                options={[
                  {
                    label: "M",
                    value: 1,
                  },
                  {
                    label: "L",
                    value: 2,
                  },
                  {
                    label: "XL",
                    value: 3,
                  },
                  {
                    label: "2XL",
                    value: 4,
                  },
                ]}
              />
            }
          />
          <HStack alignItems="flex-end">
            <Field
              name="quantity"
              label="Số lượng"
              component={
                <TextField
                  w="100px"
                  fontWeight="500"
                  textAlign="center"
                  type="number"
                  before={
                    <QuantityButton
                      as="button"
                      onClick={() => handleChangeQuantity("sub")}
                    >
                      -
                    </QuantityButton>
                  }
                  after={
                    <QuantityButton
                      as="button"
                      onClick={() => handleChangeQuantity("add")}
                    >
                      +
                    </QuantityButton>
                  }
                />
              }
            />
            <NextButton>Mua ngay</NextButton>
            <NextButton colorScheme="red">Thêm vào giỏ hàng</NextButton>
          </HStack>
        </Stack>
      </FormProvider>
    </Box>
  )
}
const QuantityButton = styled(Box)`
  padding: 0 8px;
  font-weight: 500;
`
