import { API } from "configs/services"

export function verifyOTP(otp: string) {
  return API.post("/auth/verify-otp", {
    otp,
    //@ts-ignore
    session_info: window.session_info,
  })
}
