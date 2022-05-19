import API from "configs/service"
import { SignUpDto } from "../dto/sign-up.dto"

export function signUp(data: SignUpDto) {
  return API.post("/auth/sign-up", data)
}
