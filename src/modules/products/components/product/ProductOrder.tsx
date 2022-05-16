import { Box, HStack, Stack } from "@chakra-ui/react"
import StyledButton from "components/chakra/StyledButton"
import Field from "components/Field"
import SelectBoxField from "components/Field/SelectBoxField"
import TextField from "components/Field/TextField"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components"

interface ProductOrderProps {}
interface FormValues {
  quantity: number
}

export default function ProductOrder({}: ProductOrderProps) {
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
    <Box mt="30px">
      <FormProvider {...methods}>
        <Stack spacing="4">
          <Field
            name="color"
            label="Màu sắc"
            render={({ field: { onChange } }) => (
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
                onChange={onChange}
              />
            )}
          />
          <Field
            name="size"
            label="Kích thước"
            render={({ field: { onChange } }) => (
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
                onChange={onChange}
              />
            )}
          />
          <HStack alignItems="flex-end">
            <Field
              name="quantity"
              label="Số lượng"
              render={({ field: { onChange, value } }) => (
                <TextField
                  w="100px"
                  fontWeight="500"
                  textAlign="center"
                  type="number"
                  icon={{
                    before: (
                      <ButtonQuantity
                        as="button"
                        onClick={() => handleChangeQuantity("sub")}
                      >
                        -
                      </ButtonQuantity>
                    ),
                    after: (
                      <ButtonQuantity
                        as="button"
                        onClick={() => handleChangeQuantity("add")}
                      >
                        +
                      </ButtonQuantity>
                    ),
                  }}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <StyledButton>Mua ngay</StyledButton>
            <StyledButton colorScheme="red">Thêm vào giỏ hàng</StyledButton>
          </HStack>
        </Stack>
      </FormProvider>
    </Box>
  )
}
const ButtonQuantity = styled(Box)`
  padding: 0 8px;
  font-weight: 500;
`
