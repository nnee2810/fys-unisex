import { CreateProductDto } from "modules/products/dto"
import { useCreateProduct } from "modules/products/hooks"
import { useForm } from "react-hook-form"

export function useFormCreateProduct() {
  const methods = useForm<CreateProductDto>({
    defaultValues: {
      name: "",
      price: 0,
    },
  })
  const { mutate, isLoading } = useCreateProduct()
  return { methods }
}
