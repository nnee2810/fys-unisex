import { API } from "configs/services"
import { ResetPasswordDto } from "../dto"

export function resetPassword(data: ResetPasswordDto) {
  return API.post("/auth/reset-password", {
    ...data,
    //@ts-ignore
    session_info: window.session_info,
  })
}
