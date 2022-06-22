import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { ErrorMessage, SuccessMessage } from "configs/constants"
import { formSchemas } from "helpers"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { deleteWhiteSpace, getValidateNotMatchMessage } from "utils"
import * as yup from "yup"
import { SignUpDto } from "../dto"
import { signUp } from "../services"

interface FormValues {
  name: string
  phone: string
  email: string
  password: string
  repeat_password: string
}

const schema = yup.object({
  name: formSchemas.name,
  email: formSchemas.email,
  phone: formSchemas.phone,
  password: formSchemas.password,
  repeat_password: yup
    .string()
    .label("Nhập lại mật khẩu")
    .oneOf([yup.ref("password")], getValidateNotMatchMessage),
})

export function useFormSignUp() {
  const router = useRouter()

  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeat_password: "",
    },
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation(
    "sign-up",
    (data: SignUpDto) => signUp(data),
    {
      onSuccess() {
        router.push("/auth/sign-in")
        toast.success(SuccessMessage.SIGN_UP_SUCCESS)
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
    }
  )

  const handleSubmit = ({
    name,
    phone,
    repeat_password,
    ...data
  }: FormValues) => {
    mutate({
      ...data,
      name: deleteWhiteSpace(name),
      phone: deleteWhiteSpace(phone),
    })
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
