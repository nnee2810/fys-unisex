import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { isEmail, isPhoneNumber } from "class-validator"
import { ErrorMessage, Key } from "configs/constants"
import { formSchemas } from "helpers"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { getValidateInvalidMessage, getValidateRequiredMessage } from "utils"
import * as yup from "yup"
import { SignInByPasswordDto } from "../dto"
import { signInByPassword } from "../services"
import { useAuth } from "./useAuth"

interface FormValues {
  key: string
  password: string
}

const schema = yup.object({
  key: yup
    .string()
    .label("Email/Số điện thoại")
    .required(getValidateRequiredMessage)
    .test({
      test: (value) =>
        value ? isEmail(value) || isPhoneNumber(value, "VN") : false,
      message: getValidateInvalidMessage,
    }),
  password: formSchemas.password,
})

export function useFormSignIn() {
  const { fetchProfile } = useAuth()

  const methods = useForm<FormValues>({
    defaultValues: {
      key: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation("sign-in", signInByPassword, {
    onSuccess: (data) => {
      Cookies.set(Key.ACCESS_TOKEN, data)
      fetchProfile()
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          ErrorMessage[
            error.response?.data?.message as keyof typeof ErrorMessage
          ] || ErrorMessage.INTERNAL_SERVER_ERROR
        )
      } else toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
    },
  })

  const handleSubmit = ({ key, password }: FormValues) => {
    const submitData: SignInByPasswordDto = {
      password,
    }
    if (isEmail(key)) submitData.email = key
    if (isPhoneNumber(key, "VN")) submitData.phone = key
    mutate(submitData)
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
