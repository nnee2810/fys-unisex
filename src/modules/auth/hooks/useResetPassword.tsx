import { API } from "configs/services"
import { useMutation } from "react-query"
import { ResetPasswordDto } from "../dto"

export function useResetPassword() {
  return useMutation("reset-password", (data: ResetPasswordDto) =>
    API.post("/auth/reset-password", {
      ...data,
      //@ts-ignore
      session_info: window.session_info,
    })
  )
}
