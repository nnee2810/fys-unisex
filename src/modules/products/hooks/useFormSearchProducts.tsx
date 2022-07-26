import { yupResolver } from "@hookform/resolvers/yup"
import { ProductClassify, ProductSize } from "interfaces/entities"
import { useRouter } from "next/router"
import qs from "query-string"
import { useForm } from "react-hook-form"
import { deleteWhiteSpace, validateInvalidMessage } from "utils"
import * as yup from "yup"
import { GetProductsDto } from "../dto"

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
    .oneOf(Object.keys(ProductSize), validateInvalidMessage),
  classify: yup
    .string()
    .label("Loại sản phẩm")
    .oneOf(Object.keys(ProductClassify), validateInvalidMessage),
  min_price: yup
    .number()
    .label("Giá tối thiểu")
    .min(0, validateInvalidMessage)
    .when("max_price", (max_price: number, schema) => {
      return schema.test({
        test: (min_price: number) =>
          min_price >= 0 && max_price >= 0 ? min_price < max_price : true,
        message: validateInvalidMessage,
      })
    })
    .transform((value) => (isNaN(value) ? undefined : value)),
  max_price: yup
    .number()
    .label("Giá tối đa")
    .min(0, validateInvalidMessage)
    .transform((value) => (isNaN(value) ? undefined : value)),
})

export function useFormSearchProducts(query: GetProductsDto) {
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

  const handleSubmit = methods.handleSubmit((data: FormValues) => {
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
  })

  return {
    methods,
    handleSubmit,
  }
}
