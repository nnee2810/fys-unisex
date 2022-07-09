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
  PRODUCT_LIST = "Sản phẩm",
  PRODUCT_DETAIL = "Chi tiết sản phẩm",
  USER_PROFILE = "Tài khoản của tôi",
  USER_ADDRESS = "Địa chỉ",
  DASHBOARD_OVERVIEW = "Dashboard - Tổng quan",
}
export enum SuccessMessage {
  SIGN_UP_SUCCESS = "Tạo tài khoản thành công, hãy đăng nhập",
  SIGN_OUT_SUCCESS = "Đăng xuất thành công",
  UPDATE_PROFILE_SUCCESS = "Cập nhật tài khoản thành công",
  UPDATE_PHONE_SUCCESS = "Cập nhật số điện thoại thành công",
  UPDATE_AVATAR_SUCCESS = "Cập nhật ảnh đại điện thành công",
  CREATE_ADDRESS_SUCCESS = "Thêm địa chỉ thành công",
  UPDATE_ADDRESS_SUCCESS = "Cập nhật địa chỉ thành công",
  DELETE_ADDRESS_SUCCESS = "Xóa địa chị chỉ thành công",
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
export enum ImageSource {
  DEFAULT = "https://dummyimage.com/",
  AVATAR = "https://ui-avatars.com/api/",
}

export const toastConfig: ToastContainerProps = {
  draggable: false,
  autoClose: 3000,
}
export const responsiveW = {
  base: "90vw",
  "2xl": "1400px",
}
