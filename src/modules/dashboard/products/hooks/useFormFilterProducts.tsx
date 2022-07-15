import { ProductClassify } from "modules/products/interfaces"
import { useForm } from "react-hook-form"

interface FormValues {
  name: string
  classify?: ProductClassify
}

export function useFormFilterProducts() {
  const methods = useForm<FormValues>()
  return { methods }
}