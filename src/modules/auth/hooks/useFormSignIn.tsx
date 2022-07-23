import { yupResolver } from "@hookform/resolvers/yup"
import { Key } from "configs/constants"
import { formSchema } from "helpers"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useSignIn } from "."
import { useAuth } from "./useAuth"

interface FormValues {
  phone: string
  password: string
}

const schema = yup.object({
  phone: formSchema.phone,
  password: formSchema.password,
})

export function useFormSignIn() {
  const { fetchProfile } = useAuth()
  const methods = useForm<FormValues>({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })
  const { mutate, isLoading } = useSignIn()

  const handleSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        Cookies.set(Key.ACCESS_TOKEN, data)
        fetchProfile()
      },
    })
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
