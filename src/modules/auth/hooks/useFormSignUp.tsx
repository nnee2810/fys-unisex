import { yupResolver } from "@hookform/resolvers/yup"
import { isPhoneNumber } from "class-validator"
import { Regex } from "configs/constants"
import { useForm } from "react-hook-form"
import {
  getValidateInvalidMessage,
  getValidateNotMatchMessage,
  getValidateRequiredMessage,
} from "utils"
import * as yup from "yup"
import { useSendOTP, useSignUp } from "."
import { ActionOTP } from "../dto"

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
      then: yup.string().required(getValidateRequiredMessage),
    }),
  province_code: yup
    .number()
    .label("Tỉnh/Thành phố")
    .when("step", {
      is: 1,
      then: yup.number().required(getValidateRequiredMessage),
    }),
  district_code: yup
    .number()
    .label("Quận/Huyện")
    .when("step", {
      is: 1,
      then: yup.number().required(getValidateRequiredMessage),
    }),
  ward_code: yup
    .number()
    .label("Phường/Xã")
    .when("step", {
      is: 1,
      then: yup.number().required(getValidateRequiredMessage),
    }),
  address_detail: yup.string(),
  password: yup
    .string()
    .label("Mật khẩu")
    .when("step", {
      is: 2,
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
      is: 2,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .oneOf([yup.ref("password")], getValidateNotMatchMessage),
    }),
  phone: yup
    .string()
    .label("Số điện thoại")
    .when("step", {
      is: 3,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .max(10, getValidateInvalidMessage)
        .test({
          test: (value) => (value ? isPhoneNumber(value, "VN") : false),
          message: getValidateInvalidMessage,
        }),
    }),
  otp: yup
    .string()
    .label("Mã xác minh")
    .when("step", {
      is: 4,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .length(6, getValidateInvalidMessage),
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
  const { mutate: mutateSignUp, isLoading: isLoadingSignUp } = useSignUp()
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
