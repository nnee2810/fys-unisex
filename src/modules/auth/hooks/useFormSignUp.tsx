import { yupResolver } from "@hookform/resolvers/yup"
import { isPhoneNumber } from "class-validator"
import { Regex } from "configs/constants"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import {
  validateInvalidMessage,
  validateNotMatchMessage,
  validateRequiredMessage,
} from "utils"
import * as yup from "yup"
import { useSendOTP } from "."
import { ActionOTP } from "../dto"
import { signUp } from "../services"

export interface FormSignUpValues {
  step: number
  phone: string
  otp: string
  password: string
  repeat_password: string
  name: string
  province_code?: number
  district_code?: number
  ward_code?: number
  address_detail: string
}

const schema = yup.object({
  step: yup.number(),
  name: yup
    .string()
    .label("Họ và tên")
    .when("step", {
      is: 1,
      then: yup.string().required(validateRequiredMessage),
    }),
  province_code: yup
    .number()
    .label("Tỉnh/Thành phố")
    .when("step", {
      is: 1,
      then: yup.number().required(validateRequiredMessage),
    }),
  district_code: yup
    .number()
    .label("Quận/Huyện")
    .when("step", {
      is: 1,
      then: yup.number().required(validateRequiredMessage),
    }),
  ward_code: yup
    .number()
    .label("Phường/Xã")
    .when("step", {
      is: 1,
      then: yup.number().required(validateRequiredMessage),
    }),
  address_detail: yup.string(),
  password: yup
    .string()
    .label("Mật khẩu")
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
    .label("Nhập lại mật khẩu")
    .when("step", {
      is: 2,
      then: yup
        .string()
        .required(validateRequiredMessage)
        .oneOf([yup.ref("password")], validateNotMatchMessage),
    }),
  phone: yup
    .string()
    .label("Số điện thoại")
    .when("step", {
      is: 3,
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
      is: 4,
      then: yup
        .string()
        .required(validateRequiredMessage)
        .length(6, validateInvalidMessage),
    }),
})

export function useFormSignUp() {
  const methods = useForm<FormSignUpValues>({
    defaultValues: {
      step: 1,
      phone: "",
      otp: "",
      password: "",
      repeat_password: "",
      name: "",
      address_detail: "",
    },
    resolver: yupResolver(schema),
  })
  const { mutate: mutateSignUp, isLoading: isLoadingSignUp } = useMutation(
    "sign-up",
    signUp
  )
  const { mutate: mutateSendOTP, isLoading: isLoadingSendOTP } = useSendOTP()

  const watchStep = methods.watch("step")
  const nextStep = () => {
    methods.setValue("step", watchStep + 1)
  }
  const handleSubmit = async ({
    step,
    phone,
    otp,
    password,
    name,
    province_code,
    district_code,
    ward_code,
    address_detail,
  }: FormSignUpValues) => {
    switch (step) {
      case 1: {
        nextStep()
        break
      }
      case 2: {
        nextStep()
        break
      }
      case 3: {
        mutateSendOTP(
          {
            phone,
            action: ActionOTP.SIGN_UP,
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
      case 4: {
        mutateSignUp(
          {
            name,
            province_code: province_code!,
            district_code: district_code!,
            ward_code: ward_code!,
            address_detail,
            password,
            phone,
            otp,
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
    isLoading: isLoadingSendOTP || isLoadingSignUp,
  }
}
