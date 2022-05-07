import { Button, Stack } from "@chakra-ui/react"
import Field from "components/Field"
import SelectField from "components/Field/SelectField"
import TextField from "components/Field/TextField"
import { ISelectOption } from "interfaces/ISelectOption"
import { useRouter } from "next/router"
import qs from "query-string"
import { FormProvider, useForm } from "react-hook-form"
import { deleteWhiteSpace } from "utils/deleteWhiteSpace"
import { sizeOptions, sortOptions, typeOptions } from "../constants"
import { GetProductsDto } from "../dto/get-products-dto"

interface SearchFormProps {
  query: GetProductsDto
  isLoading?: boolean
}

interface FormValues {
  name?: string
  size?: ISelectOption
  type?: ISelectOption
  sort?: ISelectOption
}

export default function SearchForm({ query, isLoading }: SearchFormProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: deleteWhiteSpace(query.name),
      size: sizeOptions.find((option) => option.value === query.size),
      type: typeOptions.find((option) => option.value === query.type),
      sort: sortOptions.find((option) => option.value === query.sort),
    },
  })

  const handleSubmit = ({ name, size, sort, type }: FormValues) => {
    let submitData: GetProductsDto = {
      name: deleteWhiteSpace(name),
      size: size && String(size?.value),
      sort: sort && String(sort?.value),
      type: type && String(type?.value),
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
        <Stack spacing="4" position="sticky" top="60px">
          <Field
            name="name"
            label="Tên sản phẩm"
            render={({ field }) => <TextField field={field} />}
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

          <Stack>
            <Button type="submit" isLoading={isLoading} isDisabled={isLoading}>
              Lọc
            </Button>
            {Object.keys(query).length && (
              <Button colorScheme="red" onClick={handleReset}>
                Đặt lại
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  )
}
