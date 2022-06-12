import API from "configs/service"
import { SignInByPasswordDto } from "../dto"

export async function signInByPassword(data: SignInByPasswordDto) {
  return (await API.post<string>("/auth/sign-in", data)).data
}
