import { isEmail, isPhoneNumber } from "class-validator"
import {
  getValidateInvalidMessage,
  getValidateRequiredMessage,
} from "utils/getValidateMessage"
import * as yup from "yup"
import { Regex } from "./constants"

export const formSchema = {
  fullName: yup
    .string()
    .label("Họ tên")
    .required(({ label }) => getValidateRequiredMessage(label)),
  phone: yup
    .string()
    .label("Số điện thoại")
    .required(({ label }) => getValidateRequiredMessage(label))
    .test({
      test: (value) => (value ? isPhoneNumber(value, "VN") : false),
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
  email: yup
    .string()
    .label("Email")
    .required(({ label }) => getValidateRequiredMessage(label))
    .test({
      test: (value) => (value ? isEmail(value) : false),
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
  password: yup
    .string()
    .label("Mật khẩu")
    .required(({ label }) => getValidateRequiredMessage(label))
    .matches(
      Regex.PASSWORD,
      ({ label }) =>
        `${label} chứa ít nhất 8 kí tự bao gồm chữ hoa, chữ thường và số`
    ),
}
