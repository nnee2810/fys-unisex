import { ToastContainerProps } from "react-toastify"

export const LIMIT_PER_PAGE = 20
export const PAGE_PADDING = "30px"
export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^(0)(3|5|7|8|9)+([0-9]{8})$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
}
export const MESSAGE = {
  SUCCESS: "Success",
  ERROR: "Đã có lỗi xảy ra, vui lòng thử lại sau",
  EMAIL_ALREADY_EXIST: "Email đã được sử dụng",
  PHONE_ALREADY_EXIST: "Số điện thoại đã được sử dụng",
  SIGN_UP_SUCCESS: "Đăng ký tài khoản thành công, hãy đăng nhập",
}
export const KEY = {
  ACCESS_TOKEN: "accessToken",
}

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
