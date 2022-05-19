import API from "configs/service"
import { SignInDto } from "../dto/sign-in.dto"

export function signIn(data: SignInDto) {
  return API.post("/auth/sign-in", data)
}
