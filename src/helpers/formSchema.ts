import { isPhoneNumber } from "class-validator"
import { Regex } from "configs/constants"
import { validateInvalidMessage, validateRequiredMessage } from "utils"
import * as yup from "yup"

export const formSchema = {
  name: yup.string().label("Họ tên").required(validateRequiredMessage),
  phone: yup
    .string()
    .label("Số điện thoại")
    .required(validateRequiredMessage)
    .max(10, validateInvalidMessage)
    .test({
      test: (value) => (value ? isPhoneNumber(value, "VN") : false),
      message: validateInvalidMessage,
    }),

  password: yup
    .string()
    .label("Mật khẩu")
    .required(validateRequiredMessage)
    .matches(
      Regex.PASSWORD,
      ({ label }) =>
        `${label} chứa ít nhất 8 kí tự bao gồm chữ hoa, chữ thường và số`
    ),
  province_code: yup
    .number()
    .label("Tỉnh/Thành phố")
    .required(validateRequiredMessage),
  district_code: yup
    .number()
    .label("Quận/Huyện")
    .required(validateRequiredMessage),
  ward_code: yup.number().label("Phường/Xã").required(validateRequiredMessage),
  address_detail: yup.string(),
}
