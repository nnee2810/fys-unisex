import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { isEmail, isPhoneNumber } from "class-validator"
import { Key, Message } from "configs/constants"
import { formSchema } from "helpers"
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
  signInKey: string
  password: string
}

const schema = yup.object().shape({
  signInKey: yup
    .string()
    .label("Email/Số điện thoại")
    .required(({ label }) => getValidateRequiredMessage(label))
    .test({
      test: (value) =>
        value ? isEmail(value) || isPhoneNumber(value, "VN") : false,
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
  password: formSchema.password,
})

export function useFormSignIn() {
  const { fetchProfile } = useAuth()

  const methods = useForm<FormValues>({
    defaultValues: {
      signInKey: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation(
    "signInByPassword",
    signInByPassword,
    {
      onSuccess: (data) => {
        Cookies.set(Key.ACCESS_TOKEN, data)
        fetchProfile()
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(
            Message[error.response?.data?.message as keyof typeof Message] ||
              Message.SERVER_ERROR
          )
        } else toast.error(Message.SERVER_ERROR)
      },
    }
  )

  const handleSubmit = ({ signInKey, password }: FormValues) => {
    const submitData: SignInByPasswordDto = {
      password,
    }
    if (isEmail(signInKey)) submitData.email = signInKey
    if (isPhoneNumber(signInKey, "VN")) submitData.phone = signInKey
    mutate(submitData)
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
