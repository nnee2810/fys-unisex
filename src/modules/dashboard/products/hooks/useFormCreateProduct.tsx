import { yupResolver } from "@hookform/resolvers/yup"
import { CreateProductDto } from "modules/products/dto"
import { useCreateProduct } from "modules/products/hooks"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { validateInvalidMessage, validateRequiredMessage } from "utils"
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().label("Tên sản phẩm").required(validateRequiredMessage),
  classify: yup.string().label("Phân loại").required(validateRequiredMessage),
  price: yup
    .number()
    .label("Giá")
    .required(validateRequiredMessage)
    .min(0, validateInvalidMessage)
    .transform((value) => (isNaN(value) ? undefined : value)),
})

export function useFormCreateProduct(onClose: () => void) {
  const queryClient = useQueryClient()
  const methods = useForm<CreateProductDto>({
    defaultValues: {
      name: "",
      price: 0,
    },
    resolver: yupResolver(schema),
  })
  const { mutate, isLoading } = useCreateProduct()

  const handleSubmit = methods.handleSubmit((data: CreateProductDto) => {
    mutate(data, {
      onSuccess() {
        onClose()
        toast.success("Thêm sản phẩm thành công")
        queryClient.invalidateQueries("get-product-list")
      },
    })
  })

  return { methods, handleSubmit, isLoading }
}
