import { ToastContainerProps } from "react-toastify"

export const LIMIT_PER_PAGE = 20
export const Regex = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
}
export enum Message {
  SUCCESS = "Success",
  ERROR = "Đã có lỗi xảy ra, vui lòng thử lại sau",
  EMAIL_ALREADY_EXIST = "Email đã được sử dụng",
  PHONE_ALREADY_EXIST = "Số điện thoại đã được sử dụng",
  SIGN_UP_SUCCESS = "Đăng ký tài khoản thành công, hãy đăng nhập",
  SIGN_IN_FAIL = "Thông tin đăng nhập không chính xác",
  FILE_INVALID_TYPE = "Tệp không hợp lệ",
  FILE_TOO_LARGE = "Dung lượng tệp quá lớn",
}
export enum Key {
  ACCESS_TOKEN = "accessToken",
}
export enum zIndex {
  FEATURED_TABS = 2,
  BACK_TO_TOP = 3,
  HEADER = 4,
}
export enum ImageSource {
  DEFAULT = "https://picsum.photos",
  AVATAR = "https://ui-avatars.com/api",
}

export const toastConfig: ToastContainerProps = {
  draggable: false,
  autoClose: 3000,
}
export const responsiveW = {
  base: "90vw",
  "2xl": "1400px",
}
