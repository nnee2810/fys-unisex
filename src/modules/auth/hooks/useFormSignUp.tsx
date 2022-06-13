import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { Message } from "configs/constants"
import { formSchema } from "helpers"
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
  repeatPassword: string
}

const schema = yup.object().shape({
  name: formSchema.name,
  email: formSchema.email,
  phone: formSchema.phone,
  password: formSchema.password,
  repeatPassword: yup
    .string()
    .label("Nhập lại mật khẩu")
    .oneOf([yup.ref("password")], ({ label }) =>
      getValidateNotMatchMessage(label)
    ),
})

export function useFormSignUp() {
  const router = useRouter()

  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation(
    "signUp",
    (data: SignUpDto) => signUp(data),
    {
      onSuccess() {
        toast.success(Message.SIGN_UP_SUCCESS)
        router.push("/auth/sign-in")
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

  const handleSubmit = ({
    name,
    phone,
    repeatPassword,
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
