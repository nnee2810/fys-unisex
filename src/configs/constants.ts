import { ISelectOption } from "interfaces"
import { Accept } from "react-dropzone"
import { ToastContainerProps } from "react-toastify"

export const TAKE_PER_PAGE = 20
export const Regex = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
}
export enum PageTitle {
  HOME = "Trang chủ",
  SIGN_IN = "Đăng nhập",
  SIGN_UP = "Tạo tài khoản",
  RESET_PASSWORD = "Quên mật khẩu",
  PRODUCTS = "Sản phẩm",
  PRODUCT_DETAIL = "Chi tiết sản phẩm",
  USER_PROFILE = "Tài khoản của tôi",
  USER_ADDRESS = "Địa chỉ",
  DASHBOARD_OVERVIEW = "Tổng quan",
  DASHBOARD_PRODUCTS = "Sản phẩm",
}

export enum ErrorMessage {
  INTERNAL_SERVER_ERROR = "Không thể xử lý yêu cầu, vui lòng thử lại sau",
  FILE_INVALID_TYPE = "Tệp không hợp lệ",
  FILE_TOO_LARGE = "Dung lượng tệp quá lớn",
}

export enum Key {
  ACCESS_TOKEN = "access_token",
}
export enum zIndex {
  FEATURED_TABS = 2,
  BACK_TO_TOP = 3,
  HEADER = 4,
}
export enum ImageSrc {
  DEFAULT = "https://dummyimage.com",
}
export const toastConfig: ToastContainerProps = {
  draggable: false,
  autoClose: 3000,
  position: "top-center",
}
export const responsiveW = {
  base: "90vw",
  "2xl": "1400px",
}
export const confirmOptions: ISelectOption<boolean>[] = [
  {
    label: "Có",
    value: true,
  },
  {
    label: "Không",
    value: false,
  },
]
export const acceptImage: Accept = {
  "image/jpg": [],
  "image/jpeg": [],
  "image/png": [],
}
