import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { isMobilePhone } from "class-validator"
import { ErrorMessage, Regex, SuccessMessage } from "configs/constants"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import {
  getValidateInvalidMessage,
  getValidateNotMatchMessage,
  getValidateRequiredMessage,
} from "utils"
import * as yup from "yup"
import { SignUpDto } from "../dto"
import { signUp } from "../services"

export interface FormSignUpValues {
  step: number
  phone: string
  otp: string
  password: string
  repeat_password: string
  name: string
  email: string
  province_code: number
  district_code: number
  ward_code: number
  address_detail: string
}

const schema = yup.object({
  step: yup.number(),
  phone: yup
    .string()
    .label("Số điện thoại")
    .when("step", {
      is: 1,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .test({
          test: (value) => (value ? isMobilePhone(value, "vi-VN") : false),
          message: getValidateInvalidMessage,
        }),
    }),
  otp: yup
    .string()
    .label("Mã xác minh")
    .when("step", {
      is: 2,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .length(6, getValidateInvalidMessage),
    }),
  password: yup
    .string()
    .label("Mật khẩu")
    .when("step", {
      is: 3,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .matches(
          Regex.PASSWORD,
          ({ label }) =>
            `${label} chứa ít nhất 8 kí tự bao gồm chữ hoa, chữ thường và số`
        ),
    }),
  repeat_password: yup
    .string()
    .label("Nhập lại mật khẩu")
    .when("step", {
      is: 3,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .oneOf([yup.ref("password")], getValidateNotMatchMessage),
    }),
  name: yup.string().label("Họ và tên"),
})

export function useFormSignUp() {
  const router = useRouter()
  const methods = useForm<FormSignUpValues>({
    defaultValues: {
      step: 2,
      phone: "",
      otp: "",
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

  const watchStep = methods.watch("step")

  const nextStep = () => {
    methods.setValue("step", watchStep + 1)
  }
  const handleSubmit = ({
    step,
    phone,
    otp,
    password,
    repeat_password,
  }: FormSignUpValues) => {
    switch (step) {
      case 1: {
        console.log(phone)
        nextStep()
        break
      }
      case 2: {
        console.log(otp)
        nextStep()
        break
      }
      case 3: {
        console.log(password, repeat_password)
        nextStep()
        break
      }
    }
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
