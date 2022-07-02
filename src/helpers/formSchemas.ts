import { isPhoneNumber } from "class-validator"
import { Regex } from "configs/constants"
import { getValidateInvalidMessage, getValidateRequiredMessage } from "utils"
import * as yup from "yup"

export const formSchemas = {
  name: yup.string().label("Họ tên").required(getValidateRequiredMessage),
  phone: yup
    .string()
    .label("Số điện thoại")
    .required(getValidateRequiredMessage)
    .max(10, getValidateInvalidMessage)
    .test({
      test: (value) => (value ? isPhoneNumber(value, "VN") : false),
      message: getValidateInvalidMessage,
    }),

  password: yup
    .string()
    .label("Mật khẩu")
    .required(getValidateRequiredMessage)
    .matches(
      Regex.PASSWORD,
      ({ label }) =>
        `${label} chứa ít nhất 8 kí tự bao gồm chữ hoa, chữ thường và số`
    ),
  province_code: yup
    .number()
    .label("Tỉnh/Thành phố")
    .required(getValidateRequiredMessage),
  district_code: yup
    .number()
    .label("Quận/Huyện")
    .required(getValidateRequiredMessage),
  ward_code: yup
    .number()
    .label("Phường/Xã")
    .required(getValidateRequiredMessage),
  address_detail: yup.string(),
}
