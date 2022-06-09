import API from "configs/service"
import { SignInByPasswordDto } from "../dto/sign-in-by-password.dto"

export async function signInByPassword(data: SignInByPasswordDto) {
  return (await API.post<string>("/auth/sign-in", data)).data
}
