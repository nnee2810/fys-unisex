import { yupResolver } from "@hookform/resolvers/yup"
import { IProductEntity, ProductClassify } from "interfaces/entities"
import { useUpdateProduct } from "modules/products/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { validateInvalidMessage, validateRequiredMessage } from "utils"
import * as yup from "yup"

interface UseFormUpdateProductProps {
  data?: IProductEntity
  onClose(): void
}

interface FormValues {
  name: string
  classify: ProductClassify
  price: number
  sale_price: number
  for_sale: boolean
  in_sale: boolean
  in_stock: boolean
}

const schema = yup.object({
  name: yup.string().label("Tên sản phẩm").required(validateRequiredMessage),
  classify: yup.string().label("Phân loại").required(validateRequiredMessage),
  price: yup
    .number()
    .label("Giá")
    .required(validateRequiredMessage)
    .min(0, validateInvalidMessage)
    .transform((value) => (isNaN(value) ? undefined : value)),
  sale_price: yup
    .number()
    .label("Giá")
    .required(validateRequiredMessage)
    .min(0, validateInvalidMessage)
    .transform((value) => (isNaN(value) ? undefined : value)),
  for_sale: yup.boolean().required(validateRequiredMessage),
})

export function useFormUpdateProduct({
  data,
  onClose,
}: UseFormUpdateProductProps) {
  const queryClient = useQueryClient()
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const { mutate, isLoading } = useUpdateProduct()

  const handleSubmit = methods.handleSubmit((values: FormValues) => {
    if (!data) return
    mutate(
      { id: data.id, ...values },
      {
        onSuccess() {
          onClose()
          toast.success("Cập nhật sản phẩm thành công")
          queryClient.invalidateQueries("get-product-list")
        },
      }
    )
  })

  useEffect(() => {
    if (data) {
      const { name, classify, price, sale_price, for_sale, in_sale, in_stock } =
        data

      methods.reset({
        name,
        classify,
        price,
        sale_price,
        for_sale,
        in_sale,
        in_stock,
      })
    }
  }, [data])

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
