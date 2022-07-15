import { yupResolver } from "@hookform/resolvers/yup"
import { Key } from "configs/constants"
import { formSchemas } from "helpers"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as yup from "yup"
import { signInByPassword } from "../services"
import { useAuth } from "./useAuth"

interface FormValues {
  phone: string
  password: string
}

const schema = yup.object({
  phone: formSchemas.phone,
  password: formSchemas.password,
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
  const { mutate, isLoading } = useMutation("sign-in", signInByPassword)

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
