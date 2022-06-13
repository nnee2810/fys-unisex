import { useForm } from "react-hook-form"

export function useFormCreateAddress() {
  const methods = useForm()

  const handleSubmit = () => {}

  return { methods, handleSubmit }
}
