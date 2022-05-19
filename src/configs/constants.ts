import { ToastContainerProps } from "react-toastify"

export const LIMIT_PER_PAGE = 20
export const PAGE_PADDING = "30px"
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
export const PHONE_REGEX = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
export const ERROR_MESSAGE = "Đã có lỗi xảy ra, vui lòng thử lại sau"
export const EMAIL_USED_MESSAGE = "Email đã được sử dụng"
export const PHONE_USED_MESSAGE = "Số điện thoại đã được sử dụng"

export const toastConfig: ToastContainerProps = {
  draggable: false,
  theme: "colored",
}
export const responsiveW = {
  base: "90vw",
  "2xl": "1400px",
}
export const zIndex = {
  featuredTabs: 5,
  backToTop: 6,
  header: 7,
}
