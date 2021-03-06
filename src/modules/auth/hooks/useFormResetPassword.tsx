import { yupResolver } from "@hookform/resolvers/yup"
import { isPhoneNumber } from "class-validator"
import { Regex } from "configs/constants"
import { useForm } from "react-hook-form"
import {
  validateInvalidMessage,
  validateNotMatchMessage,
  validateRequiredMessage,
} from "utils"
import * as yup from "yup"
import { useResetPassword, useSendOTP } from "."
import { ActionOTP } from "../dto"

export interface FormResetPasswordValues {
  step: number
  phone: string
  otp: string
  password: string
  repeat_password: string
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
        .required(validateRequiredMessage)
        .max(10, validateInvalidMessage)
        .test({
          test: (value) => (value ? isPhoneNumber(value, "VN") : false),
          message: validateInvalidMessage,
        }),
    }),
  otp: yup
    .string()
    .label("Mã xác minh")
    .when("step", {
      is: 2,
      then: yup
        .string()
        .required(validateRequiredMessage)
        .length(6, validateInvalidMessage),
    }),
  password: yup
    .string()
    .label("Mật khẩu mới")
    .when("step", {
      is: 2,
      then: yup
        .string()
        .required(validateRequiredMessage)
        .matches(
          Regex.PASSWORD,
          ({ label }) =>
            `${label} chứa ít nhất 8 kí tự bao gồm chữ hoa, chữ thường và số`
        ),
    }),
  repeat_password: yup
    .string()
    .label("Nhập lại mật khẩu mới")
    .when("step", {
      is: 2,
      then: yup
        .string()
        .required(validateRequiredMessage)
        .oneOf([yup.ref("password")], validateNotMatchMessage),
    }),
})

export function useFormResetPassword() {
  const methods = useForm<FormResetPasswordValues>({
    defaultValues: {
      step: 1,
      phone: "",
      otp: "",
      password: "",
      repeat_password: "",
    },
    resolver: yupResolver(schema),
  })
  const { mutate: mutateSendOTP, isLoading: isLoadingSendOTP } = useSendOTP()
  const { mutate: mutateResetPassword, isLoading: isLoadingResetPassword } =
    useResetPassword()

  const watchStep = methods.watch("step")
  const nextStep = () => {
    methods.setValue("step", watchStep + 1)
  }
  const handleSubmit = async ({
    step,
    phone,
    otp,
    password,
  }: FormResetPasswordValues) => {
    switch (step) {
      case 1: {
        mutateSendOTP(
          {
            phone,
            action: ActionOTP.RESET_PASSWORD,
          },
          {
            onSuccess(data) {
              //@ts-ignore
              window.session_info = data
              nextStep()
            },
          }
        )
        break
      }
      case 2: {
        mutateResetPassword(
          {
            otp,
            phone,
            password,
          },
          {
            onSuccess() {
              nextStep()
            },
          }
        )
        break
      }
    }
  }
  return {
    methods,
    handleSubmit,
    isLoading: isLoadingSendOTP || isLoadingResetPassword,
  }
}
