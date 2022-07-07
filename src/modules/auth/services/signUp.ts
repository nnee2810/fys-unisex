import { API } from "configs/services"
import { SignUpDto } from "../dto/sign-up.dto"

export function signUp(data: SignUpDto) {
  return API.post("/auth/sign-up", {
    ...data,
    //@ts-ignore
    session_info: window.session_info,
  })
}
