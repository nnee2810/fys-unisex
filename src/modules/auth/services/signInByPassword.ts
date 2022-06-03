import API from "configs/service"
import { SignInByPasswordDto } from "../dto/sign-in-by-password.dto"

export async function signInByPassword(
  data: SignInByPasswordDto
): Promise<string> {
  return (await API.post("/auth/sign-in", data)).data
}
