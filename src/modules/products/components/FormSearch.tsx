import { Button, Stack } from "@chakra-ui/react"
import Field from "components/Field"
import { FormProvider, useForm } from "react-hook-form"
import { formatCurrency } from "utils/formatCurrency"
import { sizeOptions, typeOptions } from "../constants"

interface FormValues {
  name?: string
  size?: number
  type?: string
  sort?: string
}

export default function FormSearch() {
  const methods = useForm<FormValues>()

  const handleSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack wrap="wrap" shouldWrapChildren>
          <Field variant="TEXT" name="name" label="Tên sản phẩm" />
          <Field
            variant="SELECT"
            name="size"
            label="Kích cỡ"
            options={sizeOptions}
          />
          <Field
            variant="SELECT"
            name="type"
            label="Loại sản phẩm"
            options={typeOptions}
          />
          <Field variant="SELECT" name="sort" label="Sắp xếp" />
          <Field
            variant="RANGE_SLIDER"
            name="priceRange"
            label="Khoảng giá"
            min={0}
            max={1000000}
            step={50000}
            formatValue={formatCurrency}
          />
          <Button w="100%" type="submit" colorScheme="green">
            Lọc
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
