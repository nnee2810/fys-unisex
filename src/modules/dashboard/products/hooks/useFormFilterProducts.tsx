import { ProductClassify } from "interfaces/entities"
import { useForm } from "react-hook-form"

interface FormValues {
  name: string
  classify?: ProductClassify
}

export function useFormFilterProducts() {
  const methods = useForm<FormValues>()
  return { methods }
}
